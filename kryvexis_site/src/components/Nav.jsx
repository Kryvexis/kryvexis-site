"use client";
import Container from "./Container";
import { motion, AnimatePresence } from "./Motion";
import { ArrowRight, Menu, X, Play } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "Showcase", href: "#showcase" },
  { label: "Workflow", href: "#workflow" },
  { label: "Tour", href: "#tour" },
  { label: "Features", href: "#features" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];


export default function Nav({ onOpenVideo }){
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");
  const compact = scrolled;

  useEffect(()=>{
    const onScroll = ()=> setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return ()=> window.removeEventListener("scroll", onScroll);
  },[]);

  // Highlight the active section link as the user scrolls
  useEffect(()=>{
    const ids = ["top", ...links.map(l=>l.href.replace("#",""))];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);

    const io = new IntersectionObserver((entries)=>{
      let best = null;
      for (const e of entries){
        if (!e.isIntersecting) continue;
        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
      }
      if (best?.target?.id) setActive(`#${best.target.id}`);
    }, { threshold: [0.18, 0.28, 0.42, 0.58] });

    els.forEach(el=>io.observe(el));
    return ()=> io.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <Container className="py-3">
        <div className={"relative rounded-2xl px-3 sm:px-4 " + (compact ? "py-2 nav-shell nav-shell--solid" : "py-3 nav-shell")}>
        <div className="nav-glowline" aria-hidden />
        <div className="nav-content flex items-center justify-between gap-4">

          {/* BIG RESPONSIVE BRAND */}
          <a href="#top" className="flex items-center min-w-[230px] underglow">
            <div className="brand-plate brand-scale transition-transform duration-300 hover:scale-[1.05]">
              <Logo height={compact ? 56 : 64} className="kx-logo" priority />
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-6 text-sm text-white/80">
            {links.map(l=>(
              <a
                key={l.href}
                href={l.href}
                className={
                  "transition relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-white/40 hover:after:w-full after:transition-all " +
                  (active === l.href ? "text-white" : "hover:text-white")
                }
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button className="btn-secondary" onClick={onOpenVideo}>
              <Play size={16} /> Demo (coming soon)
            </button>
            <a className="btn-primary" href="https://wa.me/27686282874?text=Hi%20Kryvexis!%20I%20would%20like%20a%20demo%20/%20early%20access." target="_blank" rel="noreferrer">
              Book a demo <ArrowRight size={16} />
            </a>
          </div>

          <button className="lg:hidden btn-secondary px-3 py-2" onClick={()=>setOpen(v=>!v)} aria-label="Menu">
            {open ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-4 glass rounded-2xl p-4"
            >
              <div className="flex flex-col gap-3 text-white/85">
                {links.map(l=>(
                  <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="py-2">{l.label}</a>
                ))}
                <button onClick={()=>{ setOpen(false); onOpenVideo?.(); }} className="btn-secondary mt-1">
                  <Play size={16}/> Demo (coming soon)
                </button>
                <a href="#contact" onClick={()=>setOpen(false)} className="btn-primary mt-1">Book a demo</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}
