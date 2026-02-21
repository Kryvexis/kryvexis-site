"use client";
import { motion, useScroll, useSpring } from "./Motion";

export default function ScrollProgress(){
  const { scrollYProgress } = useScroll();
  const v = useSpring(scrollYProgress, { stiffness: 260, damping: 40 });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[90] h-[2px] w-full origin-left bg-white/10"
      style={{ scaleX: v }}
    />
  );
}
