require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const sanitizeHtml = require('sanitize-html');
const { z } = require('zod');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');
const submissionsPath = path.join(dataDir, 'submissions.json');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(submissionsPath)) fs.writeFileSync(submissionsPath, '[]');

app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'https:'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"],
        formAction: ["'self'", 'https://wa.me', 'mailto:'],
        upgradeInsecureRequests: []
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: false, limit: '50kb' }));
app.use(express.static(publicDir, {
  extensions: ['html'],
  maxAge: '1h',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: 'Too many enquiries from this connection. Please wait a few minutes and try again.'
  }
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  email: z.string().trim().email().max(120),
  service: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10).max(3000),
  company: z.string().max(0).optional().or(z.literal(''))
});

function clean(value) {
  return sanitizeHtml(String(value || ''), {
    allowedTags: [],
    allowedAttributes: {}
  }).replace(/\s+/g, ' ').trim();
}

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE).toLowerCase() === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
}

async function sendEnquiryEmail(payload) {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: 'smtp_not_configured' };

  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
  const replyTo = payload.email;

  const subject = `New Kryvexis enquiry: ${payload.service}`;
  const text = [
    'New website enquiry received.',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Service: ${payload.service}`,
    '',
    'Message:',
    payload.message
  ].join('\n');

  await transporter.sendMail({
    from,
    to,
    replyTo,
    subject,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h2>New Kryvexis enquiry</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${payload.service}</p>
        <p><strong>Message:</strong></p>
        <p>${payload.message.replace(/\n/g, '<br/>')}</p>
      </div>
    `
  });

  return { sent: true };
}

function saveSubmission(payload, meta = {}) {
  const existing = JSON.parse(fs.readFileSync(submissionsPath, 'utf8'));
  existing.push({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...payload,
    ...meta
  });
  fs.writeFileSync(submissionsPath, JSON.stringify(existing, null, 2));
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const candidate = {
      name: clean(req.body.name),
      phone: clean(req.body.phone),
      email: clean(req.body.email),
      service: clean(req.body.service),
      message: sanitizeHtml(String(req.body.message || ''), {
        allowedTags: [],
        allowedAttributes: {}
      }).trim(),
      company: clean(req.body.company)
    };

    const parsed = contactSchema.safeParse(candidate);
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        message: 'Please check your details and try again.'
      });
    }

    if (parsed.data.company) {
      return res.status(200).json({
        ok: true,
        message: 'Your message has been received.'
      });
    }

    const result = await sendEnquiryEmail(parsed.data);
    saveSubmission(parsed.data, {
      emailSent: result.sent,
      emailReason: result.reason || null,
      ip: req.ip,
      userAgent: req.get('user-agent') || ''
    });

    return res.status(200).json({
      ok: true,
      message: result.sent
        ? 'Your message has been sent successfully. Kryvexis will get back to you soon.'
        : 'Your message has been saved successfully. Email delivery still needs SMTP setup on the server.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      ok: false,
      message: 'Unable to send your message right now. Please use WhatsApp or email directly.'
    });
  }
});

app.get('/health', (_req, res) => {
  res.json({ ok: true, status: 'healthy' });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Kryvexis site running on http://localhost:${PORT}`);
});
