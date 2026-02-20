"use client";
import { useEffect } from "react";

/**
 * Subtle scroll-driven background drift (Apple-like polish).
 * Updates CSS variables used by .bg-shift overlay in globals.css.
 */
export default function BackgroundShift(){
  useEffect(()=>{
    let raf = 0;
    const on = ()=>{
      if (raf) return;
      raf = requestAnimationFrame(()=>{
        raf = 0;
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        const p = Math.min(1, Math.max(0, window.scrollY / max));

        // Drift positions (percent)
        const aX = 18 + Math.sin(p * Math.PI * 2) * 6;
        const aY = 12 + Math.cos(p * Math.PI * 2) * 6;
        const bX = 82 + Math.cos(p * Math.PI * 2) * 5;
        const bY = 18 + Math.sin(p * Math.PI * 2) * 7;
        const cX = 50 + Math.sin(p * Math.PI * 2 + 1.1) * 7;
        const cY = 90 + Math.cos(p * Math.PI * 2 + 1.1) * 5;

        // Opacity drift
        const o1 = 0.18 + 0.08 * (0.5 + 0.5*Math.sin(p*2*Math.PI));
        const o2 = 0.14 + 0.07 * (0.5 + 0.5*Math.cos(p*2*Math.PI));
        const o3 = 0.12 + 0.07 * (0.5 + 0.5*Math.sin(p*2*Math.PI + 0.7));

        doc.style.setProperty("--bg-a-x", aX.toFixed(2) + "%");
        doc.style.setProperty("--bg-a-y", aY.toFixed(2) + "%");
        doc.style.setProperty("--bg-b-x", bX.toFixed(2) + "%");
        doc.style.setProperty("--bg-b-y", bY.toFixed(2) + "%");
        doc.style.setProperty("--bg-c-x", cX.toFixed(2) + "%");
        doc.style.setProperty("--bg-c-y", cY.toFixed(2) + "%");

        doc.style.setProperty("--bg-o1", o1.toFixed(3));
        doc.style.setProperty("--bg-o2", o2.toFixed(3));
        doc.style.setProperty("--bg-o3", o3.toFixed(3));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return ()=>{
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  },[]);

  return null;
}
