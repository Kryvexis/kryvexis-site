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
    <div className={"sticky top-0 z-50 " + (scrolled ? "bg-kx-bg/60 backdrop-blur border-b border-white/10" : "bg-transparent")}>
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">

          {/* BIG RESPONSIVE BRAND */}
          <a href="#top" className="flex items-center min-w-[220px] underglow">
            <div className="brand-scale transition-transform duration-300 hover:scale-[2.35]">
              <Logo height={56} />
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-6 text-sm text-white/80">
            {links.map(l=>(
              <a
                key={l.href}
                href={l.href}
                className="hover:text-white transition relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-white/40 hover:after:w-full after:transition-all"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button className="btn-secondary" onClick={onOpenVideo}>
              <Play size={16} /> Demo (coming soon)
            </button>
            <a className="btn-primary" href="#contact">
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
      </Container>
    </div>
  );
}
