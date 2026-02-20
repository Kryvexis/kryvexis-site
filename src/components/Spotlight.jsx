"use client";
import { useCallback, useRef } from "react";

export default function Spotlight({ children, className="" }){
  const ref = useRef(null);

  const onMove = useCallback((e)=>{
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", x + "%");
    el.style.setProperty("--my", y + "%");
  },[]);

  return (
    <div ref={ref} onMouseMove={onMove} className={"spotlight " + className}>
      {children}
    </div>
  );
}
