"use client";
import { motion } from "./Motion";
import Reveal from "./Reveal";
import { useEffect, useRef, useState } from "react";

function useInView(ref){
  const [on, setOn] = useState(false);
  useEffect(()=>{
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e])=>{
      if (e.isIntersecting) setOn(true);
    }, { threshold: 0.35 });
    io.observe(el);
    return ()=> io.disconnect();
  }, [ref]);
  return on;
}

function Counter({ to=100, suffix="", duration=900 }){
  const ref = useRef(null);
  const on = useInView(ref);
  const [v, setV] = useState(0);

  useEffect(()=>{
    if (!on) return;
    const start = performance.now();
    const from = 0;
    const tick = (t)=>{
      const p = Math.min(1, (t-start)/duration);
      // easeOutCubic
      const e = 1 - Math.pow(1-p,3);
      const val = Math.round(from + (to-from)*e);
      setV(val);
      if (p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [on, to, duration]);

  return <span ref={ref}>{v}{suffix}</span>;
}

export default function Stats(){
  const stats = [
    { k: "Faster invoicing", v: 70, s: "%", d: "Reduce admin time for small teams." },
    { k: "Fewer mistakes", v: 45, s: "%", d: "Stock and sales stay aligned." },
    { k: "Setup time", v: 1, s: " day", d: "Get running fast with onboarding." },
    { k: "Pilot window", v: 30, s: " days", d: "Perfect for a trial rollout." },
  ];

  return (
    <div className="mt-10 grid md:grid-cols-4 gap-4">
      {stats.map((x,i)=>(
        <Reveal key={x.k} delay={0.05 + i*0.05}>
          <div className="glass rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs text-white/60">{x.k}</div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight">
              <Counter to={x.v} suffix={x.s} />
            </div>
            <div className="mt-2 text-xs text-white/55">{x.d}</div>
            <div aria-hidden className="absolute -bottom-8 -right-10 h-32 w-32 rounded-full bg-kx-blue/25 blur-2xl animate-haloBreath" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
