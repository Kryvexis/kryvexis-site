"use client";
import Container from "./Container";
import { motion } from "./Motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav(){
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
        <div className="flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl glass shadow-glow grid place-items-center">
              <span className="font-black text-sm tracking-tight">KX</span>
            </div>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight">Kryvexis</div>
              <div className="text-xs text-white/60 -mt-0.5">OS • Business Control</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
            {links.map(l=>(
              <a key={l.href} href={l.href} className="hover:text-white transition">{l.label}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a className="btn-secondary" href="#contact">Talk to us</a>
            <a className="btn-primary" href="#contact">
              Book a demo <ArrowRight size={16} />
            </a>
          </div>

          <button className="md:hidden btn-secondary px-3 py-2" onClick={()=>setOpen(v=>!v)} aria-label="Menu">
            {open ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 glass rounded-2xl p-4"
          >
            <div className="flex flex-col gap-3 text-white/85">
              {links.map(l=>(
                <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="py-2">{l.label}</a>
              ))}
              <a href="#contact" onClick={()=>setOpen(false)} className="btn-primary mt-2">Book a demo</a>
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  );
}
