"use client";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ phone = "+27686282874" }){
  const digits = String(phone || "").replace(/\D/g,"");
  const href = `https://wa.me/${digits}?text=${encodeURIComponent("Hi Kryvexis! I would like a demo / early access.")}`;

  return (
    <a href={href} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-[70] group" aria-label="Chat on WhatsApp">
      <div className="wa-wrap">
        <div className="wa-glow" aria-hidden />
        <div className="wa-btn">
          <MessageCircle size={18} />
          <span className="hidden sm:inline">WhatsApp</span>
        </div>
      </div>
    </a>
  );
}
