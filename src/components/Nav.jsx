
"use client";
import Container from "./Container";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Nav(){
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",onScroll);
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);
  return(
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled?"backdrop-blur-xl bg-[#020617]/80 border-b border-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.25)]":"bg-transparent"}`}>
      <Container className="flex items-center justify-between h-16">
        <Logo/>
        <a href="#contact" className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:scale-105 transition">Book demo</a>
      </Container>
    </div>
  );
}
