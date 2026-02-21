"use client";
import { useEffect, useRef } from "react";

export default function Starfield(){
  const ref = useRef(null);

  useEffect(()=>{
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w=0,h=0, raf=0;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const stars = [];
    const STAR_COUNT = 150;

    function resize(){
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }

    const rnd = (a,b)=> a + Math.random()*(b-a);

    function init(){
      stars.length = 0;
      for (let i=0;i<STAR_COUNT;i++){
        stars.push({
          x: rnd(0,w), y: rnd(0,h),
          r: rnd(0.55, 1.55),
          a: rnd(0.06, 0.26),
          vx: rnd(-0.012, 0.028),
          vy: rnd(0.008, 0.045),
          tw: rnd(0.002, 0.01),
          t: rnd(0, 1000),
          hue: Math.random()<0.18 ? rnd(190, 210) : rnd(205, 230)
        });
      }
    }

    function draw(){
      ctx.clearRect(0,0,w,h);

      // soft vignette
      const g = ctx.createRadialGradient(w*0.35,h*0.15, 0, w*0.35,h*0.15, Math.max(w,h)*0.9);
      g.addColorStop(0, "rgba(18,161,238,0.08)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);

      for (const s of stars){
        s.t += 1;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -10) s.x = w+10;
        if (s.x > w+10) s.x = -10;
        if (s.y > h+10) s.y = -10;

        const tw = Math.sin(s.t * s.tw) * 0.08;
        const alpha = Math.max(0, Math.min(1, s.a + tw));

        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue}, 90%, 70%, ${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(()=>{ resize(); init(); });
    ro.observe(canvas);

    resize(); init(); draw();
    return ()=>{ cancelAnimationFrame(raf); ro.disconnect(); };
  },[]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{mixBlendMode:"screen"}}
    />
  );
}
