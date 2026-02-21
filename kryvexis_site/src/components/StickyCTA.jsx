"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function StickyCTA(){
  const [show, setShow] = useState(false);

  useEffect(()=>{
    const onScroll = ()=> setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return ()=> window.removeEventListener("scroll", onScroll);
  },[]);

  return (
    <div className={"fixed left-1/2 -translate-x-1/2 bottom-4 z-[60] transition-all duration-300 " + (show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")}
      aria-hidden={!show}
    >
      <div className="glass rounded-2xl px-3 py-2 shadow-glow border border-white/10 flex items-center gap-2">
        <div className="hidden sm:block text-xs text-white/70 pr-2 border-r border-white/10">
          Ready to try Kryvexis OS?
        </div>
        <a href="#contact" className="btn-primary !px-4 !py-2 text-sm">
          Get early access <ArrowRight size={16} />
        </a>
        <a
          className="btn-secondary !px-4 !py-2 text-sm"
          href="https://wa.me/27686282874?text=Hi%20Kryvexis!%20I%20would%20like%20a%20demo%20/%20early%20access."
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
