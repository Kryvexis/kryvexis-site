"use client";
import { useEffect } from "react";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";

export default function Toast({ open, kind = "ok", title, desc, onClose }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), 2600);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  const Icon = kind === "ok" ? CheckCircle2 : AlertTriangle;

  return (
    <div className="fixed z-[9999] right-4 top-4 sm:right-6 sm:top-6">
      <div className="glass rounded-2xl px-4 py-3 shadow-2xl border border-white/10 w-[320px]">
        <div className="flex items-start gap-3">
          <Icon size={18} className={kind === "ok" ? "text-kx-cyan" : "text-yellow-300"} />
          <div className="flex-1">
            <div className="text-sm font-semibold">{title}</div>
            {desc ? <div className="text-xs text-white/60 mt-1">{desc}</div> : null}
          </div>
          <button className="opacity-70 hover:opacity-100" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
