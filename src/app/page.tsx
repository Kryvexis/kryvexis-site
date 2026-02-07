"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Wrench,
  Boxes,
  CheckCircle2,
  AlertTriangle,
  FileScan,
  TriangleAlert,
  Dices,
  Shuffle,
  BadgeCheck,
  Clock,
  Lock,
  Layers,
  Sparkles,
  Mail,
  MessageCircle,
  Facebook,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

type LineItem = { code: string; desc: string; qty: number; price: number; total: number };

function money(n: number) {
  return `R ${n.toFixed(2)}`;
}
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]) {
  return arr[randInt(0, arr.length - 1)];
}
function pad(n: number, len = 5) {
  return String(n).padStart(len, "0");
}
function shuffleArr<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const WHATSAPP_NUMBER = "27686282874";
const FACEBOOK_URL = "https://www.facebook.com/share/17TngbQ63y/?mibextid=wwXIfr";
const EMAIL_DISPLAY = "kryvexissolutions@gmail.com"; // for display only (button just says Email)

function waLink(prefill?: string) {
  const text = encodeURIComponent(prefill || "Hi Kryvexis 👋 I need help with Remote IT / Automation / OCR.");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function randomInvoiceText() {
  const suppliers = [
    "Acme Office Supplies",
    "BluePeak Logistics",
    "NovaTech Systems",
    "Coastal Retail Group",
    "Apex Building & Hardware",
    "Orion Security Services",
    "Riverstone Consulting",
  ];

  const services = [
    { code: "IT-001", desc: "Remote Support (1 hour)", price: 450 },
    { code: "IT-014", desc: "Network Diagnostics", price: 650 },
    { code: "M365-02", desc: "Microsoft 365 Setup", price: 900 },
    { code: "OCR-002", desc: "OCR Setup & Mapping", price: 1200 },
    { code: "AUT-010", desc: "Weekly Dashboard Build", price: 950 },
    { code: "SEC-008", desc: "Security Hardening", price: 1100 },
    { code: "BK-005", desc: "Backup Configuration", price: 850 },
    { code: "PC-003", desc: "Performance Tune-up", price: 700 },
  ];

  const supplier = pick(suppliers);
  const inv = `INV-${pad(randInt(1, 99999))}`;
  const yyyy = 2026;
  const mm = pad(randInt(1, 12), 2);
  const dd = pad(randInt(1, 28), 2);
  const date = `${yyyy}-${mm}-${dd}`;

  const count = randInt(2, 5);
  const chosen = shuffleArr(services).slice(0, count);

  const lines = chosen.map((s) => {
    const qty = randInt(1, 3);
    const price = s.price + randInt(-50, 150);
    return `${s.code} | ${s.desc} | ${qty} | ${price}`;
  });

  const includeTotal = Math.random() > 0.18;

  const itemsSubtotal = lines.reduce((acc, line) => {
    const parts = line.split("|").map((x) => x.trim());
    const qty = Number(parts[2]) || 0;
    const price = Number(parts[3]) || 0;
    return acc + qty * price;
  }, 0);

  const vatRate = 0.15;
  const includeVat = Math.random() > 0.2;
  const total = includeVat ? itemsSubtotal * (1 + vatRate) : itemsSubtotal;

  return [
    `Supplier: ${supplier}`,
    `Invoice No: ${inv}`,
    `Date: ${date}`,
    ``,
    ...lines,
    ``,
    includeTotal ? `Grand Total: ${Math.round(total)}` : ``,
  ]
    .filter(Boolean)
    .join("\n");
}

function parseDemoInvoice(text: string) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const supplierLine =
    lines.find((l) => /^supplier\s*[:\-]/i.test(l)) ||
    lines.find((l) => /^from\s*[:\-]/i.test(l)) ||
    lines.find((l) => /^vendor\s*[:\-]/i.test(l));

  const supplier =
    supplierLine?.split(/[:\-]/).slice(1).join(":").trim() || "Kryvexis Demo Supplier";

  const invLine = lines.find((l) => /^invoice/i.test(l) || /^inv\b/i.test(l));
  let invoiceNo = "INV-1029";
  if (invLine) {
    const m = invLine.match(/([A-Z]{2,6}-\d{2,8}|INV-\d{1,8}|[A-Z0-9]{3,}-\d{2,})/i);
    if (m?.[1]) invoiceNo = m[1].toUpperCase();
  }

  const dateLine = lines.find((l) => /^date\s*[:\-]/i.test(l));
  const date =
    dateLine?.match(/(\d{4}[-\/]\d{2}[-\/]\d{2}|\d{2}[-\/]\d{2}[-\/]\d{4})/)?.[1] || "2026-02-07";

  const totalLine =
    lines.find((l) => /grand\s*total/i.test(l)) || lines.find((l) => /^total/i.test(l));

  const totalRaw = totalLine?.match(/([0-9][0-9\.,]*)/)?.[1] || "";
  const totalFromText = totalRaw ? Number(totalRaw.replace(/,/g, "")) : 0;

  const items: LineItem[] = [];
  for (const l of lines) {
    const pipe = l.split("|").map((s) => s.trim());
    if (pipe.length >= 4) {
      const code = pipe[0].slice(0, 16);
      const desc = pipe[1].slice(0, 64);
      const qty = Number(pipe[2].replace(/[^\d.]/g, "")) || 0;
      const price = Number(pipe[3].replace(/[^\d.]/g, "")) || 0;
      if (code && desc && qty > 0 && price > 0) {
        items.push({ code, desc, qty, price, total: +(qty * price).toFixed(2) });
      }
    }
  }

  const subtotal = +items.reduce((a, b) => a + b.total, 0).toFixed(2);

  let total = totalFromText;
  let vat = 0;
  const flags: string[] = [];

  if (!totalFromText) {
    total = +(subtotal * 1.15).toFixed(2);
    vat = +(total - subtotal).toFixed(2);
    flags.push("Total not found — estimated from line items + VAT.");
  } else {
    vat = +(totalFromText - subtotal).toFixed(2);
    if (vat < 0) {
      flags.push("Total is lower than subtotal — check pricing / totals.");
      vat = 0;
    }
    if (vat === 0) flags.push("VAT looks missing or zero — verify tax settings.");
  }

  if (items.length === 0) flags.push("No line items detected — use CODE | DESCRIPTION | QTY | PRICE.");

  return { supplier, invoiceNo, date, items, subtotal, vat, total: +total.toFixed(2), flags };
}

export default function Page() {
  const [demoText, setDemoText] = useState<string>(() => randomInvoiceText());
  const [ran, setRan] = useState(false);
  const result = useMemo(() => (ran ? parseDemoInvoice(demoText) : null), [ran, demoText]);

  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Remote IT / Automation / OCR");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  async function submitLead() {
    setStatus(null);
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          service,
          message,
          page: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setStatus({ ok: false, msg: data?.error || "Failed to send. Please try again." });
        return;
      }

      setStatus({ ok: true, msg: "Sent! We received your request and will reply shortly." });
      setName("");
      setEmail("");
      setService("Remote IT / Automation / OCR");
      setMessage("");
    } catch {
      setStatus({ ok: false, msg: "Network error. Please try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* ===================== HERO ===================== */}
      <section id="home" className="k-wrap k-section pt-10 md:pt-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="k-surface rounded-[28px] p-7 md:p-12"
        >
          <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr] md:items-start">
            {/* Left */}
            <div className="flex flex-col gap-6">
              <div className="k-badge">
                <span className="h-2 w-2 rounded-full bg-[color:var(--k-ok)]" />
                Remote IT • Automation • OCR Capture
              </div>

              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.04] k-title">
                  Kryvexis <span className="text-white/70">Solutions</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base md:text-lg k-subtitle text-[color:var(--k-muted)]">
                  Professional cyber-calm systems for small business: secure remote support, automation dashboards,
                  and OCR document capture that turns invoices into clean data.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#demo" className="k-btn">
                  Try the Demo <Sparkles className="h-4 w-4" />
                </a>
                <a href="#contact" className="k-btn k-btn-ghost">
                  Request Help <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  { t: "Secure Access", d: "Client-owned + logged", icon: <Lock className="h-4 w-4" /> },
                  { t: "Fast Response", d: "Remote-first workflow", icon: <Zap className="h-4 w-4" /> },
                  { t: "Clear Handover", d: "Notes + next steps", icon: <BadgeCheck className="h-4 w-4" /> },
                ].map((x) => (
                  <div key={x.t} className="k-stat">
                    <div className="flex items-center gap-2 text-[color:var(--k-accent)]">
                      {x.icon}
                      <div className="font-semibold text-[color:var(--k-text)]">{x.t}</div>
                    </div>
                    <div className="mt-2 text-sm text-[color:var(--k-muted)]">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right rail (NO WhatsApp/Email/Facebook here anymore) */}
            <div className="k-panel p-6 md:p-7">
              <div className="text-xs font-semibold text-[color:var(--k-muted)]">OPERATIONAL FOCUS</div>
              <div className="mt-2 text-lg font-extrabold tracking-tight">Less chaos. More control.</div>

              <div className="mt-5 grid gap-4">
                {[
                  { icon: <ShieldCheck className="h-5 w-5" />, t: "Secure workflow", d: "Access control, logs, and clean handover." },
                  { icon: <Layers className="h-5 w-5" />, t: "System thinking", d: "Automation + reporting, not just fixes." },
                  { icon: <Clock className="h-5 w-5" />, t: "Predictable delivery", d: "Clear scope, clear timelines." },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-[color:var(--k-accent)]">
                      {x.icon}
                      <div className="font-semibold text-[color:var(--k-text)]">{x.t}</div>
                    </div>
                    <div className="mt-2 text-sm text-[color:var(--k-muted)]">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 k-divider" />

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { a: "15–60 min", b: "Typical response window" },
              { a: "Audit-ready", b: "Documented changes + handover" },
              { a: "OCR → Sheets", b: "Invoices → structured data" },
            ].map((x) => (
              <div key={x.a} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-lg font-extrabold tracking-tight">{x.a}</div>
                <div className="mt-1 text-sm text-[color:var(--k-muted)]">{x.b}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===================== DEMO ===================== */}
      <section id="demo" className="k-wrap k-section">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="k-surface rounded-[28px] p-7 md:p-10"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="k-badge">
                <FileScan className="h-4 w-4 text-[color:var(--k-accent)]" />
                Interactive OCR Demo
              </div>
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight">OCR Engine Preview</h2>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-[color:var(--k-muted)]">
                Generate different invoices and see extracted supplier, invoice number, totals, and line items.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className="k-btn k-btn-ghost text-sm"
                onClick={() => {
                  setDemoText(randomInvoiceText());
                  setRan(false);
                }}
              >
                Generate <Dices className="h-4 w-4" />
              </button>

              <button
                className="k-btn k-btn-ghost text-sm"
                onClick={() => {
                  const all = demoText.split("\n");
                  const header: string[] = [];
                  const items: string[] = [];
                  const footer: string[] = [];

                  let inItems = false;
                  for (const l of all) {
                    const isItem = l.includes("|") && l.split("|").length >= 4;
                    if (!inItems && isItem) inItems = true;

                    if (!inItems) header.push(l);
                    else {
                      if (isItem) items.push(l);
                      else footer.push(l);
                    }
                  }

                  const next = [...header, ...shuffleArr(items), ...footer].join("\n").trim();
                  setDemoText(next);
                  setRan(false);
                }}
              >
                Shuffle <Shuffle className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-[22px] border border-white/10 bg-[rgba(0,0,0,.22)] p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/80">Input</div>
                <span className="text-xs text-white/40">Paste text or generate</span>
              </div>

              <textarea
                className="mt-4 k-textarea"
                value={demoText}
                onChange={(e) => {
                  setDemoText(e.target.value);
                  setRan(false);
                }}
              />

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button className="k-btn" onClick={() => setRan(true)}>
                  Run OCR <ArrowRight className="h-4 w-4" />
                </button>
                <a href="#contact" className="k-btn k-btn-ghost">
                  Request real setup
                </a>
              </div>

              <div className="mt-4 text-xs text-[color:var(--k-muted)]">
                Format: <span className="text-white/70">CODE | DESCRIPTION | QTY | PRICE</span>
              </div>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,.03)] p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/80">Output</div>
                <span className="text-xs text-white/40">Extracted fields</span>
              </div>

              {!result ? (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-[color:var(--k-muted)]">
                  Run the demo to see extracted fields, line items, and validation flags.
                </div>
              ) : (
                <div className="mt-5 grid gap-5">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                      ["Supplier", result.supplier],
                      ["Invoice #", result.invoiceNo],
                      ["Date", result.date],
                      ["Total", money(result.total)],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs text-[color:var(--k-muted)]">{k}</div>
                        <div className="mt-1 font-semibold text-[color:var(--k-text)]">{v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="px-4 py-3 text-xs font-semibold text-[color:var(--k-muted)] border-b border-white/10">
                      Line items
                    </div>
                    <div className="p-4 overflow-x-auto">
                      {result.items.length === 0 ? (
                        <div className="text-sm text-[color:var(--k-muted)]">No line items detected.</div>
                      ) : (
                        <table className="w-full text-sm">
                          <thead className="text-[color:var(--k-muted)]">
                            <tr>
                              <th className="text-left font-semibold py-1 pr-3">Code</th>
                              <th className="text-left font-semibold py-1 pr-3">Description</th>
                              <th className="text-right font-semibold py-1 pr-3">Qty</th>
                              <th className="text-right font-semibold py-1 pr-3">Price</th>
                              <th className="text-right font-semibold py-1">Total</th>
                            </tr>
                          </thead>
                          <tbody className="text-[color:var(--k-text)]">
                            {result.items.slice(0, 7).map((it, idx) => (
                              <tr key={idx} className="border-t border-white/10">
                                <td className="py-2 pr-3 whitespace-nowrap">{it.code}</td>
                                <td className="py-2 pr-3 min-w-[220px]">{it.desc}</td>
                                <td className="py-2 pr-3 text-right">{it.qty}</td>
                                <td className="py-2 pr-3 text-right">{money(it.price)}</td>
                                <td className="py-2 text-right">{money(it.total)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                    <div className="px-4 py-3 text-xs text-[color:var(--k-muted)] border-t border-white/10">
                      Subtotal: <span className="text-white/80">{money(result.subtotal)}</span> • VAT:{" "}
                      <span className="text-white/80">{money(result.vat)}</span>
                    </div>
                  </div>

                  {result.flags.length > 0 && (
                    <div className="rounded-2xl p-5 border border-[rgba(251,191,36,.20)] bg-[rgba(251,191,36,.07)]">
                      <div className="flex items-center gap-2 text-[color:var(--k-warn)] font-semibold text-sm">
                        <TriangleAlert className="h-4 w-4" />
                        Review flags
                      </div>
                      <ul className="mt-3 text-sm text-[color:var(--k-muted)] space-y-1">
                        {result.flags.map((f) => (
                          <li key={f}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===================== SOLUTIONS ===================== */}
      <section id="products" className="k-wrap k-section">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="k-badge">Services</div>
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight">Solutions</h2>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-[color:var(--k-muted)]">
                Built for small business operations: less admin, more visibility, stable IT.
              </p>
            </div>
            <a href="#contact" className="hidden sm:inline-flex k-btn k-btn-ghost text-sm">
              Get a quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: <Wrench className="h-5 w-5" />,
                t: "Remote Support",
                d: "PC performance, networking, printers, Microsoft 365 — solved quickly with a secure workflow.",
              },
              {
                icon: <Boxes className="h-5 w-5" />,
                t: "Automation Systems",
                d: "Sheets/Forms pipelines, alerts, cleanup, dashboards — reduce admin and gain control.",
              },
              {
                icon: <Cpu className="h-5 w-5" />,
                t: "OCR Document Capture",
                d: "Invoices/quotes → totals + line items → structured tables with review flags.",
              },
            ].map((x) => (
              <div key={x.t} className="k-panel p-6">
                <div className="flex items-center gap-2 text-[color:var(--k-accent)]">
                  {x.icon}
                  <div className="font-semibold text-[color:var(--k-text)]">{x.t}</div>
                </div>
                <div className="mt-3 text-sm leading-relaxed text-[color:var(--k-muted)]">{x.d}</div>
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--k-accent)]"
                >
                  Enquire <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 k-surface rounded-[28px] p-7 md:p-10">
            <div className="k-badge">How it works</div>
            <div className="mt-4 text-xl md:text-2xl font-extrabold tracking-tight">Professional workflow</div>
            <div className="mt-3 text-sm text-[color:var(--k-muted)]">
              Scope → secure access → fix → handover. This is what makes it premium.
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                ["1. Diagnose", "Gather info + confirm root cause"],
                ["2. Secure Access", "Client-owned access + logging"],
                ["3. Implement Fix", "Apply change + verify result"],
                ["4. Handover", "Notes, settings, prevention tips"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="font-semibold text-[color:var(--k-text)]">{t}</div>
                  <div className="mt-2 text-sm text-[color:var(--k-muted)]">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===================== FIX ===================== */}
      <section id="fix" className="k-wrap k-section">
        <div className="k-surface rounded-[28px] p-7 md:p-10">
          <div className="k-badge">Outcome</div>
          <h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight">
            From problem → fix, professionally.
          </h3>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-[color:var(--k-muted)]">
            Calm delivery. Clear notes. Fewer repeat problems.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl p-6 border border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/20">
                  <AlertTriangle className="h-5 w-5 text-red-200" />
                </div>
                <div>
                  <div className="font-semibold text-[color:var(--k-text)]">Before</div>
                  <div className="text-sm text-[color:var(--k-muted)]">Slow, unstable, bottlenecks.</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-[color:var(--k-muted)]">
                Lag, disconnects, failed updates, and unreliable backups.
              </div>
            </div>

            <div className="rounded-3xl p-6 border border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/20">
                  <CheckCircle2 className="h-5 w-5 text-[color:var(--k-accent)]" />
                </div>
                <div>
                  <div className="font-semibold text-[color:var(--k-text)]">After</div>
                  <div className="text-sm text-[color:var(--k-muted)]">Stable, fast, controlled.</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-[color:var(--k-muted)]">
                Clean fixes, performance tuning, hardened settings, and clear handover.
              </div>
            </div>
          </div>

          <a href="#contact" className="mt-10 inline-flex k-btn text-sm">
            Start a support request <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ===================== CONTACT (ONLY place with WhatsApp/Email/Facebook) ===================== */}
      <section id="contact" className="k-wrap k-section pb-24">
        <div className="k-surface rounded-[28px] p-7 md:p-12">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="k-badge">Contact</div>
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight">
                Talk to Kryvexis
              </h2>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-[color:var(--k-muted)] max-w-xl">
                Tell me what you need help with and I’ll reply with next steps.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-[color:var(--k-muted)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--k-ok)]" />
              Online
            </div>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {/* Form */}
            <div className="grid gap-4">
              <input
                placeholder="Your name"
                className="k-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Email"
                className="k-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Remote IT / Automation / OCR"
                className="k-input"
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
              <textarea
                placeholder="Short description…"
                rows={5}
                className="k-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button className="k-btn" onClick={submitLead} disabled={sending}>
                {sending ? "Sending..." : "Send Message"} <ArrowRight className="h-4 w-4" />
              </button>

              {status && (
                <div
                  className={[
                    "rounded-2xl p-4 border text-sm",
                    status.ok
                      ? "border-[rgba(52,211,153,.20)] bg-[rgba(52,211,153,.07)] text-[color:var(--k-text)]"
                      : "border-[rgba(251,113,133,.20)] bg-[rgba(251,113,133,.07)] text-[color:var(--k-text)]",
                  ].join(" ")}
                >
                  {status.msg}
                </div>
              )}
            </div>

            {/* Direct contact */}
            <div className="rounded-3xl p-6 border border-white/10 bg-white/5">
              <div className="font-semibold text-[color:var(--k-text)]">Direct contact</div>

              <div className="mt-5 grid gap-3">
                <a
                  href={waLink("Hi Kryvexis 👋 I want to enquire about Remote IT / Automation / OCR.")}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl px-4 py-3 border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center gap-3"
                >
                  <MessageCircle className="h-5 w-5 text-[color:var(--k-ok)]" />
                  WhatsApp
                </a>

                {/* Email is just a label now; the form handles the real send */}
                <div className="rounded-2xl px-4 py-3 border border-white/10 bg-white/5 flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[color:var(--k-accent)]" />
                  Email
                  <span className="ml-auto text-xs text-white/40 hidden sm:inline">{EMAIL_DISPLAY}</span>
                </div>

                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl px-4 py-3 border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center gap-3"
                >
                  <Facebook className="h-5 w-5 text-[color:var(--k-accent2)]" />
                  Facebook
                </a>
              </div>

              <div className="mt-6 rounded-2xl p-4 border border-[rgba(52,211,153,.20)] bg-[rgba(52,211,153,.07)]">
                <div className="font-semibold text-[color:var(--k-ok)]">Secure workflow</div>
                <div className="mt-1 text-sm text-[color:var(--k-text)]">
                  Client-owned access, clean notes, and professional delivery.
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-14 text-xs text-[color:var(--k-muted)]">
            © {new Date().getFullYear()} Kryvexis • Remote IT Support & Automation
          </footer>
        </div>
      </section>
    </div>
  );
}
