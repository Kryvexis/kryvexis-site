"use client";
import { useMemo, useState } from "react";
import { Send, Mail, CheckCircle2, AlertTriangle } from "lucide-react";

const EMAIL = "kryvexissolutions@gmail.com";
const WA = "+27686282874";
const LEADS_WEBHOOK = "https://script.google.com/macros/s/AKfycbztKDDai_AeFPVYJNhkAiHusmy4O5acQxffGfEDYCBkyR1ktAWiztL4zdcM7N-FniEa/exec";

export default function ContactCard() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [biz, setBiz] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "err" | null

  const message = useMemo(() => {
    const parts = [
      "Hi Kryvexis! I would like a demo / early access.",
      name ? `Name: ${name}` : null,
      contact ? `Contact: ${contact}` : null,
      biz ? `Business: ${biz}` : null,
    ].filter(Boolean);
    return parts.join("\n");
  }, [name, contact, biz]);

  const waHref = useMemo(() => {
    const digits = WA.replace(/\D/g, "");
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  }, [message]);

  const mailHref = useMemo(() => {
    const subj = encodeURIComponent("Kryvexis OS Demo Request");
    const body = encodeURIComponent(message);
    return `mailto:${EMAIL}?subject=${subj}&body=${body}`;
  }, [message]);

  async function saveLead(source) {
    if (!LEADS_WEBHOOK) return;
    try {
      setSaving(true);
      setStatus(null);
      await fetch(LEADS_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name,
          contact,
          business: biz,
          message,
          source: source || "website",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });
      setStatus("ok");
    } catch (e) {
      setStatus("err");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(null), 2500);
    }
  }

  async function onWhatsApp() {
    await saveLead("website_whatsapp");
    window.open(waHref, "_blank", "noreferrer");
  }

  async function onEmail() {
    await saveLead("website_email");
    window.location.href = mailHref;
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-sm font-semibold">Contact Kryvexis</div>

      <div className="mt-3 grid gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="glass rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25"
          placeholder="Name"
        />
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="glass rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25"
          placeholder="Email or WhatsApp"
        />
        <input
          value={biz}
          onChange={(e) => setBiz(e.target.value)}
          className="glass rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25"
          placeholder="Business name"
        />

        <button
          type="button"
          onClick={onWhatsApp}
          className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-70"
          disabled={saving}
        >
          <Send size={16} /> {saving ? "Saving…" : "Send on WhatsApp"}
        </button>

        <button
          type="button"
          onClick={onEmail}
          className="btn-secondary w-full inline-flex items-center justify-center gap-2 disabled:opacity-70"
          disabled={saving}
        >
          <Mail size={16} /> Email instead
        </button>

        <div className="flex items-center gap-2 text-xs">
          {status === "ok" ? (
            <>
              <CheckCircle2 size={14} className="text-kx-cyan" />
              <span className="text-white/60">Saved to leads sheet</span>
            </>
          ) : status === "err" ? (
            <>
              <AlertTriangle size={14} className="text-yellow-300" />
              <span className="text-white/60">Could not save lead (still opening)</span>
            </>
          ) : (
            <span className="text-white/50">Email: {EMAIL} • WhatsApp: +27 68 628 2874</span>
          )}
        </div>
      </div>
    </div>
  );
}
