"use client";
import { useCallback, useRef } from "react";

export default function Tilt({ children, className="", max=8, parallax=10 }){
  const ref = useRef(null);

  const onMove = useCallback((e)=>{
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -max;
    const ry = (px - 0.5) * max;
    el.style.setProperty("--rx", rx.toFixed(2) + "deg");
    el.style.setProperty("--ry", ry.toFixed(2) + "deg");
    el.style.setProperty("--mx", (px*100).toFixed(2) + "%");
    el.style.setProperty("--my", (py*100).toFixed(2) + "%");
  },[max]);

  const onLeave = useCallback(()=>{
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  },[]);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-parallax={parallax}
      className={"tilt-card " + className}
    >
      {children}
    </div>
  );
}
