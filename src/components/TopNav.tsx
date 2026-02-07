"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const NAV = [
  { id: "home", label: "Home" },
  { id: "demo", label: "Demo" },
  { id: "products", label: "Solutions" },
  { id: "fix", label: "Fix" },
  { id: "contact", label: "Contact" },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={[
          "w-full transition-all",
          scrolled ? "backdrop-blur-xl bg-black/40 border-b border-white/10" : "bg-transparent",
        ].join(" ")}
      >
        <div className="k-wrap py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
            <Link href="#home" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
                <div className="h-2 w-2 rounded-full bg-[color:var(--k-accent)]" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold tracking-tight">
                  Kryvexis{" "}
                  <span className="text-[color:var(--k-accent)]">Solutions</span>
                </div>
                <div className="text-[11px] text-[color:var(--k-muted)]">
                  Remote IT • Automation • OCR
                </div>
              </div>
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="hover:text-white transition"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <a href="#contact" className="k-btn text-sm">
              Request Help <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
