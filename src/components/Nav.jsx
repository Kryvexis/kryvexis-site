"use client";
import Container from "./Container";
import { motion, AnimatePresence } from "./Motion";
import { ArrowRight, Menu, X, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "Showcase", href: "#showcase" },
  { label: "Workflow", href: "#workflow" },
  { label: "Tour", href: "#tour" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

export default function Nav({ onOpenVideo }){
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(()=>{
    const onScroll = ()=> setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return ()=> window.removeEventListener("scroll", onScroll);
  },[]);

  return (
    <div className="sticky top-0 z-50">
      <div className="relative">
        {/* CRAZY PREMIUM BACKDROP */}
        <div
          className={[
            "absolute inset-0 -z-10",
            "backdrop-blur-xl",
            "border-b",
            "transition-all duration-300",
            scrolled
              ? "bg-white/85 border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
              : "bg-white/55 border-white/20"
          ].join(" ")}
        />
        {/* top highlight */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-300/70 to-transparent opacity-90" />
        {/* subtle animated glow wash */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          initial={{ opacity: 0.55 }}
          animate={{ opacity: scrolled ? 0.65 : 0.55 }}
          transition={{ duration: 0.25 }}
          style={{
            background:
              "radial-gradient(900px 180px at 20% 0%, rgba(18,161,238,0.28), transparent 60%)," +
              "radial-gradient(900px 180px at 80% 0%, rgba(167,139,250,0.22), transparent 60%)"
          }}
        />

        <Container className="py-3">
          <div className="flex items-center justify-between gap-4">

            {/* BRAND + BADGE */}
            <a href="#top" className="flex items-center gap-3 min-w-[220px]">
              <div className="brand-scale transition-transform duration-300 hover:scale-[2.35]">
                <Logo height={56} />
              </div>
              <span className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-slate-900/80 bg-white/70 border border-black/10 shadow-sm">
                <Sparkles size={14} /> Beta
              </span>
            </a>

            {/* DESKTOP LINKS */}
            <div className="hidden lg:flex items-center gap-1 text-sm">
              {links.map(l=>(
                <a
                  key={l.href}
                  href={l.href}
                  className={[
                    "relative rounded-full px-4 py-2 font-semibold",
                    "text-slate-900/80 hover:text-slate-950",
                    "transition",
                    "hover:bg-black/5",
                    "after:absolute after:inset-x-4 after:-bottom-[6px] after:h-[2px] after:rounded-full",
                    "after:bg-gradient-to-r after:from-sky-400/70 after:via-violet-400/60 after:to-transparent",
                    "after:opacity-0 hover:after:opacity-100 after:transition-opacity"
                  ].join(" ")}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition bg-white/60 hover:bg-white/80 border border-black/10 text-slate-900 shadow-sm"
                onClick={onOpenVideo}
              >
                <Play size={16} /> Demo (coming soon)
              </button>

              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold transition text-black bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-300 hover:brightness-110 shadow-[0_18px_40px_rgba(18,161,238,0.22)]"
                href="https://wa.me/27686282874?text=Hi%20Kryvexis!%20I%20would%20like%20a%20demo%20/%20early%20access."
                target="_blank"
                rel="noreferrer"
              >
                Book a demo <ArrowRight size={16} />
              </a>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-xl px-3 py-2 transition bg-white/65 hover:bg-white/85 border border-black/10 text-slate-900 shadow-sm"
              onClick={()=>setOpen(v=>!v)}
              aria-label="Menu"
            >
              {open ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>

          {/* MOBILE PANEL */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="lg:hidden mt-4 rounded-2xl p-4 bg-white/90 border border-black/10 shadow-[0_26px_70px_rgba(0,0,0,0.22)]"
              >
                <div className="flex flex-col gap-2 text-slate-900">
                  {links.map(l=>(
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={()=>setOpen(false)}
                      className="py-2 px-3 rounded-xl hover:bg-black/5 font-semibold"
                    >
                      {l.label}
                    </a>
                  ))}

                  <div className="h-px bg-black/10 my-2" />

                  <button
                    onClick={()=>{ setOpen(false); onOpenVideo?.(); }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition bg-white hover:bg-white border border-black/10 text-slate-900 shadow-sm"
                  >
                    <Play size={16}/> Demo (coming soon)
                  </button>

                  <a
                    href="#contact"
                    onClick={()=>setOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold transition text-black bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-300 hover:brightness-110 shadow-[0_18px_40px_rgba(18,161,238,0.22)]"
                  >
                    Book a demo <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>
    </div>
  );
}
