"use client";
import { useEffect, useState } from "react";

export default function Logo({ className="", height=34 }){
  const [sweep, setSweep] = useState(false);
  useEffect(()=>{
    const t = setTimeout(()=> setSweep(true), 120);
    return ()=> clearTimeout(t);
  },[]);

  return (
    <div className={"logo-sweep " + (sweep ? "sweep-on" : "") + " " + className}>
      <img
        src="/kryvexis-logo.png"
        alt="Kryvexis"
        style={{ height, width: "auto", display: "block" }}
        draggable={false}
      />
    </div>
  );
}
