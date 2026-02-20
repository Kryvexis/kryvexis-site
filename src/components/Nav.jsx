"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/45 backdrop-blur-xl shadow-lg border-b border-white/10"
          : "bg-black/10 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Image
          src="/kryvexis-logo.png"
          alt="Kryvexis"
          width={160}
          height={40}
          className="object-contain"
        />

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-6 text-sm text-white/80">
          <a href="#showcase" className="hover:text-white">Showcase</a>
          <a href="#workflow" className="hover:text-white">Workflow</a>
          <a href="#tour" className="hover:text-white">Tour</a>
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>

        {/* CTA */}
        <a href="#contact" className="btn-primary text-sm">
          Book a demo →
        </a>
      </div>
    </header>
  );
}