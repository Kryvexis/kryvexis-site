"use client";
import { useEffect, useMemo, useState } from "react";

export default function SectionDots(){
  const items = useMemo(()=> ([
    { id: "top", label: "Top" },
    { id: "stats", label: "Stats" },
    { id: "showcase", label: "Showcase" },
    { id: "workflow", label: "Workflow" },
    { id: "tour", label: "Tour" },
    { id: "features", label: "Features" },
    { id: "roadmap", label: "Roadmap" },
    { id: "pricing", label: "Pricing" },
    { id: "testimonials", label: "Testimonials" },
    { id: "install", label: "Install" },
    { id: "founder", label: "Story" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ]), []);

  const [active, setActive] = useState("top");

  useEffect(()=>{
    const ids = items.map(x=>x.id);
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);

    const io = new IntersectionObserver((entries)=>{
      // pick the entry with highest intersection ratio
      let best = null;
      for (const e of entries){
        if (!e.isIntersecting) continue;
        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
      }
      if (best?.target?.id) setActive(best.target.id);
    }, { threshold: [0.22, 0.35, 0.5, 0.65] });

    els.forEach(el=>io.observe(el));
    return ()=> io.disconnect();
  }, [items]);

  return (
    <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-[80] flex-col gap-2">
      {items.map(it=>{
        const on = it.id === active;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={"dot " + (on ? "on" : "")}
            aria-label={it.label}
            title={it.label}
          />
        );
      })}
    </div>
  );
}
