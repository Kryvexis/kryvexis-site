"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "./Motion";
import Reveal from "./Reveal";
import { Boxes, Receipt, Truck, BarChart3, Search } from "lucide-react";

const tabs = [
  { k: "inventory", label: "Inventory", I: Boxes },
  { k: "sales", label: "Sales", I: Receipt },
  { k: "purchasing", label: "Purchasing", I: Truck },
  { k: "dash", label: "Dashboard", I: BarChart3 },
];

function Screen({ t }){
  if (t==="inventory"){
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-white/60">Low stock</div>
          <div className="mt-2 text-2xl font-extrabold">7</div>
          <div className="mt-2 text-xs text-white/55">Suggested reorder</div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-white/60">Stock value</div>
          <div className="mt-2 text-2xl font-extrabold">R 248k</div>
          <div className="mt-2 text-xs text-white/55">At cost</div>
        </div>
        <div className="sm:col-span-2 glass rounded-xl p-4">
          <div className="text-xs text-white/60">Fast product search</div>
          <div className="mt-3 flex items-center gap-2 glass rounded-xl px-3 py-2 text-xs text-white/65">
            <Search size={14} className="opacity-60"/> Search SKU / Product…
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            {["Steel Bracket","Gate Hinge","Lockset Pro","Hinge Heavy","Bracket Mini","Wheel Castor"].map(x=>(
              <div key={x} className="badge justify-center">{x}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (t==="sales"){
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-white/60">Quote → Invoice</div>
          <div className="mt-2 text-2xl font-extrabold">1 click</div>
          <div className="mt-2 text-xs text-white/55">Stock updates automatically</div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-white/60">Today sales</div>
          <div className="mt-2 text-2xl font-extrabold">R 12,480</div>
          <div className="mt-2 text-xs text-white/55">+14% vs yesterday</div>
        </div>
        <div className="sm:col-span-2 glass rounded-xl p-4">
          <div className="text-xs text-white/60">Top clients (month)</div>
          <div className="mt-3 space-y-2 text-sm">
            {["Acme Steel","Rapid Tools","Metro Gates"].map((x,i)=>(
              <div key={x} className="flex items-center justify-between">
                <span className="text-white/80">{i+1}. {x}</span>
                <span className="text-white/60">R {(i+3)*12950}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (t==="purchasing"){
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-white/60">Open POs</div>
          <div className="mt-2 text-2xl font-extrabold">3</div>
          <div className="mt-2 text-xs text-white/55">Awaiting delivery</div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-white/60">Received (30 days)</div>
          <div className="mt-2 text-2xl font-extrabold">R 71k</div>
          <div className="mt-2 text-xs text-white/55">GRV logged</div>
        </div>
        <div className="sm:col-span-2 glass rounded-xl p-4">
          <div className="text-xs text-white/60">Receiving flow</div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="badge">Create PO</span>
            <span className="badge">Email Buying</span>
            <span className="badge">Receive GRV</span>
            <span className="badge">Stock Updated</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="glass rounded-xl p-4">
        <div className="text-xs text-white/60">Top sales (month)</div>
        <div className="mt-2 text-2xl font-extrabold">R 98,200</div>
        <div className="mt-2 text-xs text-white/55">Across clients</div>
      </div>
      <div className="glass rounded-xl p-4">
        <div className="text-xs text-white/60">Low stock</div>
        <div className="mt-2 text-2xl font-extrabold">7</div>
        <div className="mt-2 text-xs text-white/55">Reorder suggested</div>
      </div>
      <div className="sm:col-span-2 glass rounded-xl p-4">
        <div className="text-xs text-white/60">Quick summary</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="badge justify-center">Margin</div>
          <div className="badge justify-center">Clients</div>
          <div className="badge justify-center">Suppliers</div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardShowcase(){
  const [active, setActive] = useState("inventory");
  const current = useMemo(()=> active, [active]);

  return (
    <div className="mt-10 grid lg:grid-cols-12 gap-6 items-stretch">
      <div className="lg:col-span-4 glass rounded-2xl p-6">
        <Reveal>
          <div className="text-sm font-semibold">Screens</div>
          <div className="mut mt-2 text-sm leading-relaxed">A more realistic feel of the Kryvexis UI — animated, fast, and clean.</div>
        </Reveal>
        <div className="mt-5 flex flex-wrap gap-2">
          {tabs.map(t=>{
            const Icon = t.I;
            const on = t.k === active;
            return (
              <button
                key={t.k}
                onClick={()=>setActive(t.k)}
                className={(on ? "bg-white/10 border-white/20" : "glass hover:border-white/20") + " inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm border transition"}
              >
                <Icon size={16} className={on ? "text-kx-cyan" : "text-white/70"} />
                <span className={on ? "text-white" : "text-white/80"}>{t.label}</span>
              </button>
            );
          })}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-6 text-xs text-white/55">
            Replace these numbers later with real demo data. The goal is: <b>confidence</b> + <b>clarity</b> in 5 seconds.
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-8 glass rounded-2xl shadow-glow overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          </div>
          <div className="text-xs text-white/60">Kryvexis OS • {tabs.find(x=>x.k===active)?.label}</div>
          <div className="text-xs text-white/60">Live mock</div>
        </div>
        <div className="p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <Screen t={current} />
            </motion.div>
          </AnimatePresence>

          <div className="relative mt-5 h-12 overflow-hidden rounded-xl glass">
            <div className="absolute inset-0 opacity-60 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
            <div className="relative h-full flex items-center justify-between px-4 text-xs text-white/70">
              <span>Fast search. Clean forms. Fewer clicks.</span>
              <span className="text-white/50">⌘K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
