"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "./Motion";
import { Boxes, Receipt, Truck, CheckCircle2 } from "lucide-react";

const tabs = [
  {
    key: "inventory",
    label: "Inventory",
    icon: Boxes,
    title: "Live stock control that your team actually uses",
    bullets: ["Fast product search", "Low-stock alerts", "Stock movements + history", "Supplier mapping"],
    mock: [
      { k: "Low Stock", v: "7 items", s: "Reorder suggested" },
      { k: "Stock Value", v: "R 248k", s: "At cost" },
    ]
  },
  {
    key: "sales",
    label: "Sales & Invoicing",
    icon: Receipt,
    title: "Quotes → invoices that update stock automatically",
    bullets: ["Quote to invoice in seconds", "Customer purchase history", "One-click printing", "Auto PDF saving (roadmap)"],
    mock: [
      { k: "Today Sales", v: "R 12,480", s: "+14% vs yesterday" },
      { k: "Top Client", v: "Acme Steel", s: "R 38,900 this month" },
    ]
  },
  {
    key: "purchasing",
    label: "Purchasing",
    icon: Truck,
    title: "PO + GRV receiving with a clean flow",
    bullets: ["Create and track POs", "Email buying team", "Receive stock (GRV)", "Supplier performance view"],
    mock: [
      { k: "Open POs", v: "3", s: "Awaiting delivery" },
      { k: "Received", v: "R 71k", s: "Last 30 days" },
    ]
  },
];

export default function ProductTour(){
  const [active, setActive] = useState("inventory");
  const current = useMemo(()=> tabs.find(t=>t.key===active) || tabs[0], [active]);

  return (
    <div className="mt-10 grid lg:grid-cols-12 gap-6 items-stretch">
      <div className="lg:col-span-5 glass rounded-2xl p-5">
        <div className="text-sm font-semibold">Product tour</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map(t=>{
            const Icon = t.icon;
            const on = t.key === active;
            return (
              <button
                key={t.key}
                onClick={()=>setActive(t.key)}
                className={(on ? "bg-white/10 border-white/20" : "glass hover:border-white/20") + " inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm border transition"}
              >
                <Icon size={16} className={on ? "text-kx-cyan" : "text-white/70"} />
                <span className={on ? "text-white" : "text-white/80"}>{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          <div className="text-xl font-extrabold tracking-tight">{current.title}</div>
          <div className="mt-4 space-y-2 text-sm text-white/80">
            {current.bullets.map(b=>(
              <div key={b} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 text-kx-blue" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 glass rounded-2xl shadow-glow overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          </div>
          <div className="text-xs text-white/60">Kryvexis OS • {current.label}</div>
          <div className="text-xs text-white/60">Live preview</div>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {current.mock.map(card => (
                <div key={card.k} className="glass rounded-xl p-4">
                  <div className="text-xs text-white/60">{card.k}</div>
                  <div className="mt-2 text-2xl font-extrabold">{card.v}</div>
                  <div className="mt-2 text-xs text-white/55">{card.s}</div>
                </div>
              ))}

              <div className="sm:col-span-2 glass rounded-xl p-4 relative overflow-hidden">
                <div className="text-xs text-white/60">Quick action</div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {current.key==="inventory" && (<>
                    <span className="badge">Add Product</span>
                    <span className="badge">Adjust Stock</span>
                    <span className="badge">Reorder</span>
                  </>)}
                  {current.key==="sales" && (<>
                    <span className="badge">New Quote</span>
                    <span className="badge">Convert → Invoice</span>
                    <span className="badge">Print</span>
                  </>)}
                  {current.key==="purchasing" && (<>
                    <span className="badge">Create PO</span>
                    <span className="badge">Email Buying Team</span>
                    <span className="badge">Receive GRV</span>
                  </>)}
                </div>

                <div className="absolute inset-0 opacity-55 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 text-xs text-white/50">*Interactive preview for marketing — tune text to your exact workflow.</div>
        </div>
      </div>
    </div>
  );
}
