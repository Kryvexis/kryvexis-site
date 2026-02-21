"use client";
import { useEffect } from "react";

/**
 * Micro parallax for elements that opt in via data-parallax="number".
 * Example: data-parallax="10" => max translate ~10px.
 */
export default function ParallaxFX(){
  useEffect(()=>{
    let raf = 0;
    const run = ()=>{
      const nodes = document.querySelectorAll("[data-parallax]");
      const vh = window.innerHeight || 800;

      nodes.forEach((el)=>{
        const rect = el.getBoundingClientRect();
        // progress -1..1 around viewport center
        const center = rect.top + rect.height/2;
        const t = (center - vh*0.5) / (vh*0.5);
        const amt = Number(el.getAttribute("data-parallax") || "8");
        const y = Math.max(-amt, Math.min(amt, -t * (amt)));
        el.style.setProperty("--py", y.toFixed(2) + "px");
      });
    };

    const on = ()=>{
      if (raf) return;
      raf = requestAnimationFrame(()=>{
        raf = 0;
        run();
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
