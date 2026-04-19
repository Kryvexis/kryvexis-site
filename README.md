# Kryvexis Production Website

This project packages your website into a real deployable Node/Express application with:

- the original premium server-room front-end concept preserved and cleaned up
- fake claims and fake testimonial-style proof toned down
- a working backend contact form endpoint
- rate limiting, input validation, sanitisation, secure headers, and hidden honeypot spam protection
- SMTP email support via environment variables
- local submission logging to `data/submissions.json`

## What's included

- `public/index.html` — your updated front-end
- `server.js` — static server + secure contact API
- `.env.example` — email configuration template
- `data/submissions.json` — local lead log created automatically

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file:

```bash
cp .env.example .env
```

3. Edit `.env` and add real SMTP values.

For Gmail, use:
- SMTP_HOST=`smtp.gmail.com`
- SMTP_PORT=`465`
- SMTP_SECURE=`true`
- SMTP_USER=`your Gmail address`
- SMTP_PASS=`your Gmail app password`

4. Start the site:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## Production deployment options

### Option 1: Render / Railway / Fly.io

This is the easiest route for this project.

- push the project to GitHub
- create a new web service
- set the start command to `npm start`
- add the environment variables from `.env.example`
- deploy

### Option 2: VPS (Ubuntu + Nginx)

Basic production flow:

```bash
sudo apt update
sudo apt install nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

Then:

```bash
npm install
npm start
```

Use a process manager like PM2:

```bash
npm install -g pm2
pm2 start server.js --name kryvexis-site
pm2 save
pm2 startup
```

Put Nginx in front of it as a reverse proxy to port 3000.

## Email setup notes

If SMTP variables are not configured, the form still:
- validates input
- logs submissions to `data/submissions.json`
- returns a clear message that SMTP still needs setup

Once SMTP is configured, enquiries will send to `CONTACT_TO_EMAIL`.

## Security notes

Included:
- Helmet security headers
- Content Security Policy
- request body limits
- express-rate-limit on `/api/contact`
- server-side validation with Zod
- input sanitisation with sanitize-html
- hidden honeypot field for bots
- no browser-exposed secrets

## Recommended next upgrades

- move submissions from JSON to PostgreSQL
- add admin login/dashboard for enquiries
- connect a domain and TLS/HTTPS
- add Privacy Policy / Terms / POPIA consent wording
- set up transactional email service like Resend, Mailgun, or Postmark
