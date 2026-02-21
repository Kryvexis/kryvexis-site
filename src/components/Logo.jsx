"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Logo({ className="", height=34 }){
  const [sweep, setSweep] = useState(false);
  useEffect(()=>{
    const t = setTimeout(()=> setSweep(true), 120);
    return ()=> clearTimeout(t);
  },[]);

  return (
    <div className={"logo-sweep " + (sweep ? "sweep-on" : "") + " " + className}>
      <Image
        src="/kryvexis-logo.png"
        alt="Kryvexis"
        height={height}
        width={Math.round(height * 2.1)}
        sizes="(max-width: 768px) 180px, 320px"
        priority
        style={{ height, width: "auto", display: "block" }}
        draggable={false}
      />
    </div>
  );
}
