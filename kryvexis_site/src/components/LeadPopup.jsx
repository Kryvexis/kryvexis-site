"use client";
import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import { X } from "lucide-react";

export default function LeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("kx_lead_popup") === "1") return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;

      if (p > 0.4) {
        sessionStorage.setItem("kx_lead_popup", "1");
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const t = setTimeout(() => {
      if (sessionStorage.getItem("kx_lead_popup") === "1") return;
      sessionStorage.setItem("kx_lead_popup", "1");
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
    }, 12000);

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-md glass rounded-3xl p-5 border border-white/10 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Get early access</div>
            <div className="text-xs text-white/60 mt-1">
              We’ll send you the demo link + onboarding.
            </div>
          </div>
          <button className="opacity-70 hover:opacity-100" onClick={() => setOpen(false)} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="mt-4">
          <ContactCard variant="modal" onDone={() => setTimeout(() => setOpen(false), 650)} />
        </div>

        <div className="mt-3 text-[11px] text-white/50">
          No spam. Only Kryvexis updates.
        </div>
      </div>
    </div>
  );
}
