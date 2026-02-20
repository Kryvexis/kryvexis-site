"use client";
import { useMemo } from "react";
import { motion } from "./Motion";

function rnd(a,b){ return a + Math.random()*(b-a); }

export default function FloatingLights(){
  const lights = useMemo(()=>{
    const arr = [];
    for (let i=0;i<6;i++){
      arr.push({
        id: i,
        x: rnd(8, 92),
        y: rnd(6, 72),
        s: rnd(180, 380),
        d: rnd(10, 20),
        o: rnd(0.18, 0.34),
        hue: i%3===0 ? 200 : (i%3===1 ? 190 : 260) // blue/cyan/purple
      });
    }
    return arr;
  },[]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {lights.map(l=>(
        <motion.div
          key={l.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: l.x + "%",
            top: l.y + "%",
            width: l.s,
            height: l.s,
            background: `radial-gradient(circle at 30% 30%, hsla(${l.hue}, 90%, 70%, ${l.o}), transparent 62%)`
          }}
          animate={{
            x: [0, 18, -10, 0],
            y: [0, -14, 12, 0],
            scale: [1, 1.06, 0.98, 1]
          }}
          transition={{ duration: l.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
