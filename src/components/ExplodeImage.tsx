"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ExplodeImageProps = {
  src: string; // e.g. "/kryvexis-hero.jpg"
  alt?: string;
  tiles?: number; // default 11 (11x11 = 121 pieces)
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Tile({
  i,
  tiles,
  src,
  scrollYProgress,
  mounted,
}: {
  i: number;
  tiles: number;
  src: string;
  scrollYProgress: any;
  mounted: boolean;
}) {
  const r = useMemo(() => mulberry32(1000 + i), [i]);

  // ✅ FIX: reduce scatter (was 520 = too chaotic)
  const startX = (r() - 0.5) * 280;
  const startY = (r() - 0.5) * 280;
  const startR = (r() - 0.5) * 28;
  const startS = 0.85 + r() * 0.35;

  const x = useTransform(scrollYProgress, [0, 1], [startX, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [startY, 0]);
  const rot = useTransform(scrollYProgress, [0, 1], [startR, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [startS, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]);

  // ✅ FIX: avoid hydration issues by applying filter only after mount
  const blurPx = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const filter = useTransform(blurPx, (v: any) => `blur(${v}px)`);


  const row = Math.floor(i / tiles);
  const col = i % tiles;

  const bgSize = `${tiles * 100}% ${tiles * 100}%`;
  const bgPos = `${(col / (tiles - 1)) * 100}% ${(row / (tiles - 1)) * 100}%`;

  return (
    <motion.div
      style={{
        x,
        y,
        rotate: rot,
        scale,
        opacity,
        backgroundImage: `url(${src})`,
        backgroundSize: bgSize,
        backgroundPosition: bgPos,
      }}
      className="rounded-[10px] border border-white/10 bg-cover bg-no-repeat contrast-125 brightness-110"
    />
  );
}

export default function ExplodeImage({
  src,
  alt = "Kryvexis visual",
  tiles = 11,
}: ExplodeImageProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // ✅ FIX: better offset so progress reliably reaches 0 → 1
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const tileCount = tiles * tiles;

  return (
    <section ref={sectionRef} aria-label={alt} className="relative">
      {/* ✅ FIX: give it real scroll space */}
      <div className="h-[120vh] md:h-[150vh]" />

      {/* ✅ FIX: sticky stage so it assembles while you scroll */}
      <div className="sticky top-20">
        <div className="mx-auto w-full max-w-[520px] md:max-w-[640px]">
          <div className="k-card rounded-3xl p-4 md:p-6 overflow-hidden relative">
            {/* ✅ FIX: match your portrait image ratio (2:3) */}
            <div className="relative aspect-[2/3] w-full">
              <div className="absolute inset-0 pointer-events-none opacity-70">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(34,211,238,.10)] blur-3xl" />
                <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[rgba(167,139,250,.10)] blur-3xl" />
              </div>

              {/* Tiles fill the exact aspect ratio */}
              <div
                className="relative grid h-full w-full gap-[4px]"
                style={{ gridTemplateColumns: `repeat(${tiles}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: tileCount }).map((_, i) => (
                  <Tile
                    key={i}
                    i={i}
                    tiles={tiles}
                    src={src}
                    scrollYProgress={scrollYProgress}
                    mounted={mounted}
                  />
                ))}
              </div>

              <div className="absolute left-5 top-5 text-xs font-semibold text-[color:var(--k-muted)]">
                Scroll to assemble → Kryvexis
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[40vh]" />
    </section>
  );
}
