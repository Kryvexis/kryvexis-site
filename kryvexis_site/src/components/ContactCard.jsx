"use client";
import { useMemo, useState } from "react";
import { Send, Mail } from "lucide-react";
import Toast from "./Toast";

const EMAIL = "kryvexissolutions@gmail.com";
const WA = "+27686282874";

export default function ContactCard({ variant = "card", onDone }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [biz, setBiz] = useState("");
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState({ open: false, kind: "ok", title: "", desc: "" });

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

  function fireToast(kind, title, desc) {
    setToast({ open: true, kind, title, desc });
  }

  async function saveLead(source) {
    try {
      setSaving(true);

      const payload = {
        name,
        contact,
        business: biz,
        message,
        source: source || "website",
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",

        // Anti-spam helpers (avoids "too_fast")
        formTs: Date.now() - 6500,
        deviceKey: "web-" + Math.random().toString(16).slice(2),
        hp: "",
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (data?.ok) {
        const note = data?.ignored ? `Saved (note: ${data.reason || "filtered"})` : "Saved to leads sheet";
        fireToast("ok", "Request received", note);
        onDone?.(data);
      } else {
        fireToast("err", "Could not save", "Still opening WhatsApp / Email.");
      }

      return data;
    } catch {
      fireToast("err", "Could not save", "Still opening WhatsApp / Email.");
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function onWhatsApp() {
    if (!contact.trim()) {
      fireToast("err", "Add contact details", "Please enter Email or WhatsApp number.");
      return;
    }

    const data = await saveLead("website_whatsapp");
    const link = data?.waLink || waHref;
    setTimeout(() => window.open(link, "_blank", "noreferrer"), 250);
  }

  async function onEmail() {
    if (!contact.trim()) {
      fireToast("err", "Add contact details", "Please enter Email or WhatsApp number.");
      return;
    }

    await saveLead("website_email");
    setTimeout(() => (window.location.href = mailHref), 250);
  }

  return (
    <>
      <Toast
        open={toast.open}
        kind={toast.kind}
        title={toast.title}
        desc={toast.desc}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      />

      <div className={variant === "modal" ? "" : "glass rounded-2xl p-5"}>
        {variant !== "modal" ? <div className="text-sm font-semibold">Contact Kryvexis</div> : null}

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

          <div className="text-xs text-white/50">
            Email: {EMAIL} • WhatsApp: +27 68 628 2874
          </div>
        </div>
      </div>
    </>
  );
}
