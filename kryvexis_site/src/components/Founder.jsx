"use client";
import Reveal from "./Reveal";
import { Sparkles } from "lucide-react";

export default function Founder(){
  return (
    <div className="mt-10 grid lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-5">
        <Reveal>
          <div className="badge"><Sparkles size={14}/> Why Kryvexis exists</div>
          <div className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight">
            Built for the realities of small business.
          </div>
          <p className="mut mt-3 text-sm md:text-base leading-relaxed">
            Kryvexis OS is designed to remove the pain: stock that doesn’t match, invoices that take too long,
            and purchasing that lives in WhatsApp threads and memory.
          </p>
          <p className="mut mt-3 text-sm md:text-base leading-relaxed">
            The goal is simple: <b>clean workflow</b>, <b>fewer clicks</b>, and <b>numbers you can trust</b> — without enterprise complexity.
          </p>
        </Reveal>
      </div>

      <div className="lg:col-span-7">
        <div className="glass rounded-2xl p-6 md:p-7 relative overflow-hidden">
          <div className="text-sm font-semibold">Design principles</div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {[
              ["Speed first", "Fast UI, quick search, clean screens."],
              ["Workflow over features", "Quote → Invoice → Stock → PO → GRV."],
              ["Simple onboarding", "Start small, scale up."],
              ["Trustworthy data", "Every movement logged, fewer mistakes."],
            ].map(([t,d],i)=>(
              <Reveal key={t} delay={0.05 + i*0.05}>
                <div className="glass rounded-2xl p-5">
                  <div className="font-bold">{t}</div>
                  <div className="mt-2 text-sm text-white/70 leading-relaxed">{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div aria-hidden className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-kx-purple/14 blur-3xl animate-driftSlow" />
        </div>
      </div>
    </div>
  );
}
