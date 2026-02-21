"use client";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { Quote } from "lucide-react";

const items = [
  { n: "Pilot user", r: "Hardware & tools", q: "Stock finally matches sales. My team stopped guessing and we stopped double-capturing." },
  { n: "Pilot user", r: "Workshop", q: "Quotes to invoices is fast. It feels like real software — not spreadsheets." },
  { n: "Pilot user", r: "Trading business", q: "The workflow is clean. Receiving stock with GRV keeps everything accurate." },
];

export default function Testimonials(){
  return (
    <div className="mt-10 grid md:grid-cols-3 gap-5">
      {items.map((x,i)=>(
        <Reveal key={i} delay={0.06 + i*0.05}>
          <Tilt className="relative rounded-2xl">
            <div className="glass rounded-2xl p-6 relative overflow-hidden">
              <Quote size={18} className="opacity-50" />
              <div className="mt-3 text-sm text-white/80 leading-relaxed">{x.q}</div>
              <div className="mt-5 text-sm font-bold">{x.n}</div>
              <div className="text-xs text-white/55">{x.r}</div>
              <div aria-hidden className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-kx-blue/18 blur-3xl animate-haloBreath" />
            </div>
          </Tilt>
        </Reveal>
      ))}
    </div>
  );
}
