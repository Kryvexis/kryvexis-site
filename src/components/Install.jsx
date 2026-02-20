"use client";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { Laptop, Smartphone, PlusSquare, Download } from "lucide-react";

export default function Install(){
  const cards = [
    {
      t: "Desktop",
      I: Laptop,
      d: "Open the site in Chrome → click the install icon in the address bar to add Kryvexis like an app."
    },
    {
      t: "Android",
      I: Smartphone,
      d: "Chrome menu → Add to Home screen. Kryvexis opens full-screen like a real app."
    },
    {
      t: "iPhone",
      I: PlusSquare,
      d: "Share → Add to Home Screen. Launch from your home screen anytime."
    },
  ];

  return (
    <div className="mt-10 grid lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-4">
        <Reveal>
          <div className="text-2xl md:text-3xl font-extrabold tracking-tight">Make it feel like real software.</div>
          <p className="mut mt-3 leading-relaxed">
            You can install the Kryvexis web app to your desktop or phone for that “real app” experience.
          </p>
          <div className="mt-5 badge"><Download size={14}/> Install in seconds</div>
        </Reveal>
      </div>
      <div className="lg:col-span-8 grid md:grid-cols-3 gap-5">
        {cards.map((c,i)=>{
          const Icon = c.I;
          return (
            <Reveal key={c.t} delay={0.06 + i*0.05}>
              <Tilt className="relative rounded-2xl">
                <div className="glass rounded-2xl p-6">
                  <div className="h-11 w-11 rounded-2xl glass grid place-items-center"><Icon size={18} className="text-kx-blue"/></div>
                  <div className="mt-4 font-bold">{c.t}</div>
                  <div className="mt-2 text-sm text-white/70 leading-relaxed">{c.d}</div>
                </div>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
