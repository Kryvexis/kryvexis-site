"use client";
import Reveal from "./Reveal";
import { motion } from "./Motion";
import { ArrowRight, FileText, Receipt, Boxes, ShoppingCart, PackageCheck, BarChart3 } from "lucide-react";

const steps = [
  { t: "Quote", d: "Create a quote fast", I: FileText },
  { t: "Invoice", d: "Convert in one click", I: Receipt },
  { t: "Stock Update", d: "Auto movement logged", I: Boxes },
  { t: "Purchase Order", d: "Order from suppliers", I: ShoppingCart },
  { t: "GRV Receive", d: "Receive and update stock", I: PackageCheck },
  { t: "Dashboard", d: "See performance instantly", I: BarChart3 },
];

export default function Workflow(){
  return (
    <div className="mt-10">
      <div className="glass rounded-2xl p-6 md:p-7 overflow-hidden relative">
        <div aria-hidden className="absolute -top-10 -left-10 h-56 w-56 rounded-full bg-kx-cyan/18 blur-3xl animate-driftSlow" />
        <div aria-hidden className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-kx-purple/16 blur-3xl animate-driftSlow" />
        <div className="grid lg:grid-cols-12 gap-6 items-start relative">
          <div className="lg:col-span-4">
            <div className="text-sm font-semibold">Workflow</div>
            <div className="mut mt-2 text-sm leading-relaxed">
              A single flow your team can follow. Each step connects — so the numbers make sense.
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              {steps.map((s,i)=>{
                const Icon = s.I;
                return (
                  <Reveal key={s.t} delay={0.04 + i*0.04}>
                    <div className="inline-flex items-center gap-3 glass rounded-2xl px-4 py-3">
                      <div className="h-10 w-10 rounded-2xl glass grid place-items-center">
                        <Icon size={18} className="text-kx-blue" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">{s.t}</div>
                        <div className="text-xs text-white/55">{s.d}</div>
                      </div>
                      {i !== steps.length-1 ? <ArrowRight className="ml-1 opacity-35" size={16}/> : null}
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <motion.div
              className="mt-6 h-[2px] w-full bg-white/10 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-kx-blue via-white/30 to-kx-purple"
                initial={{ x: "-60%" }}
                whileInView={{ x: "60%" }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
