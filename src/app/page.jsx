"use client";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Aurora from "../components/Aurora";
import FloatingLights from "../components/FloatingLights";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import Footer from "../components/Footer";
import ProductTour from "../components/ProductTour";
import VideoModal from "../components/VideoModal";
import Spotlight from "../components/Spotlight";
import { Card } from "../components/Card";
import { motion, useScroll, useTransform } from "../components/Motion";
import { CheckCircle2, Shield, Zap, Receipt, Truck, BarChart3, Boxes, Sparkles, ArrowRight, Play, Wand2 } from "lucide-react";

const features = [
  { title: "Live inventory control", desc: "Know what you have, what’s low, and what’s moving — instantly.", icon: Boxes, pills: ["Low-stock alerts", "Stock movements", "Fast search"] },
  { title: "Quotes → invoices", desc: "Convert quotes to invoices in seconds. Sales update stock automatically.", icon: Receipt, pills: ["Customer history", "One-click print", "Auto PDF saving"] },
  { title: "Purchasing & receiving", desc: "Create POs, notify the buying team, and receive stock with a clean GRV flow.", icon: Truck, pills: ["PO tracking", "GRV receiving", "Supplier list"] },
  { title: "Owner dashboard", desc: "Top sales, margin visibility, and daily performance views without messy spreadsheets.", icon: BarChart3, pills: ["Top sales per client", "Daily summary email", "Exports"] },
];

const tiers = [
  { name: "Starter", price: "For small teams", points: ["Products & stock", "Sales capture", "Basic invoicing", "Owner dashboard"] },
  { name: "Premium", price: "For growing operations", points: ["Purchase Orders", "Receiving (GRV)", "Import products", "Team emailing"], popular: true },
  { name: "Enterprise", price: "For advanced control", points: ["Audit trails", "Role-based access", "Exports & reporting", "Custom workflows"] }
];

const faqs = [
  { q: "Is this built for South African businesses?", a: "Yes. Kryvexis is designed for the way small businesses actually work day-to-day — simple, fast, and practical." },
  { q: "Can we start small and upgrade later?", a: "Absolutely. Start on Starter, then unlock Premium/Enterprise features when you need them." },
  { q: "Do you support printing and PDF invoices?", a: "Yes — one-click printing and automatic PDF saving are supported per tier / roadmap." },
  { q: "How do we get onboarded?", a: "We help you load products, map suppliers, and set up dashboards in a quick onboarding session." },
  { q: "Can this work with our POS?", a: "Yes. We can add an import flow so you don’t capture sales twice." },
];

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [beam, setBeam] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 620], [0, 26]);
  const r = useTransform(scrollY, [0, 620], [0, -1.35]);

  useEffect(()=>{
    const t = setTimeout(()=>setBeam(true), 150);
    return ()=>clearTimeout(t);
  },[]);

  return (
    <div id="top" className="relative min-h-screen">
      <Aurora />
      <FloatingLights />
      <Nav onOpenVideo={()=>setVideoOpen(true)} />
      <VideoModal open={videoOpen} onClose={()=>setVideoOpen(false)} youtubeId="dQw4w9WgXcQ" />

      {/* FULLSCREEN HERO */}
      <section className="relative min-h-[92vh] flex items-center">
        <div className={"hero-beam " + (beam ? "on" : "")} aria-hidden />
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="badge mb-5"><Wand2 size={14} /> The future operating system for small business</div>

              <motion.h1
                className="h1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                Welcome to <span className="text-white">Kryvexis OS</span>.
              </motion.h1>

              <motion.p
                className="mut mt-5 text-base md:text-lg leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              >
                A clean, fast workflow for <b>Inventory</b>, <b>Invoicing</b>, and <b>Purchasing</b> — built to feel like real software,
                not messy spreadsheets.
              </motion.p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a href="#contact" className="btn-primary">
                  Get early access <ArrowRight size={16} />
                </a>
                <button onClick={()=>setVideoOpen(true)} className="btn-secondary">
                  <Play size={16} /> Watch demo
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/70">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-kx-blue" />Fast onboarding</div>
                <div className="flex items-center gap-2"><Shield size={16} className="text-kx-cyan" />Practical security</div>
                <div className="flex items-center gap-2"><Zap size={16} className="text-kx-purple" />Built for speed</div>
              </div>
            </div>

            {/* Hero preview with extra float + underglow */}
            <div className="lg:col-span-5">
              <motion.div style={{ y, rotate: r }} className="relative glass rounded-2xl shadow-glow overflow-hidden will-change-transform">
                <div aria-hidden className="absolute -bottom-8 left-12 right-12 h-10 rounded-full bg-kx-blue/40 blur-2xl animate-glowPulse" />
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  </div>
                  <div className="text-xs text-white/60">Kryvexis OS • Preview</div>
                  <div className="text-xs text-white/60">v1</div>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass rounded-xl p-4 animate-floatSoft">
                      <div className="text-xs text-white/60">Today Sales</div>
                      <div className="mt-2 text-2xl font-extrabold">R 12,480</div>
                      <div className="mt-2 text-xs text-white/55">+14% vs yesterday</div>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <div className="text-xs text-white/60">Low Stock</div>
                      <div className="mt-2 text-2xl font-extrabold">7 items</div>
                      <div className="mt-2 text-xs text-white/55">Reorder suggested</div>
                    </div>
                    <div className="glass rounded-xl p-4 col-span-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/60">Top Sales (Month)</div>
                        <div className="badge">Live</div>
                      </div>
                      <div className="mt-3 space-y-2">
                        {["Steel Bracket", "Lockset Pro", "Gate Hinge"].map((x,i)=>(
                          <div key={x} className="flex items-center justify-between text-sm">
                            <div className="text-white/85">{i+1}. {x}</div>
                            <div className="text-white/60">R {(i+2)*980}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 glass rounded-xl p-4">
                    <div className="text-xs text-white/60">Workflow</div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="badge">Quote</span>
                      <span className="badge">Invoice</span>
                      <span className="badge">Stock Update</span>
                      <span className="badge">PO</span>
                      <span className="badge">GRV</span>
                    </div>
                  </div>

                  <div className="relative mt-5 h-12 overflow-hidden rounded-xl glass">
                    <div className="absolute inset-0 opacity-60 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
                    <div className="relative h-full flex items-center justify-between px-4 text-xs text-white/70">
                      <span>Search products, customers, suppliers…</span>
                      <span className="text-white/50">⌘K</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mt-4 text-xs text-white/55">*More motion + underglow, still clean and premium.</div>
            </div>
          </div>
        </Container>
      </section>

      {/* PRODUCT */}
      <section id="product" className="section relative">
        <Container>
          <SectionHeading
            kicker="Why Kryvexis"
            title="Stop the double-capture. Control the full flow."
            desc="Most businesses capture sales in one place and stock in another. Kryvexis brings the flow together so stock and money match — without pain."
          />

          <Spotlight className="mt-10 grid md:grid-cols-3 gap-5">
            <div className="glass rounded-2xl p-6">
              <div className="font-bold">Fix stock chaos</div>
              <div className="mut mt-2 text-sm leading-relaxed">See what’s low, what’s moving, and what needs reorder — quickly.</div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="font-bold">Speed up sales</div>
              <div className="mut mt-2 text-sm leading-relaxed">Quote → invoice with fewer clicks. Keep staff focused on customers.</div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="font-bold">Clean purchasing</div>
              <div className="mut mt-2 text-sm leading-relaxed">POs, receiving (GRV), and suppliers in one workflow — no guessing.</div>
            </div>
          </Spotlight>
        </Container>
      </section>

      {/* TOUR */}
      <section id="tour" className="section relative">
        <Container>
          <SectionHeading kicker="Interactive" title="Click through the product" desc="Inventory, Sales, Purchasing — explore the flow your team will use." />
          <ProductTour />
        </Container>
      </section>

      {/* FEATURES */}
      <section id="features" className="section relative">
        <Container>
          <SectionHeading kicker="Built for real roles" title="Features that match your team" desc="Owner, Sales, Buying — each gets the tools they actually need." />
          <Spotlight className="mt-10 grid md:grid-cols-2 gap-5">
            {features.map((fx)=>(<Card key={fx.title} title={fx.title} desc={fx.desc} icon={fx.icon} pills={fx.pills} />))}
          </Spotlight>
        </Container>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section relative">
        <Container>
          <SectionHeading kicker="Tiers" title="Start small. Unlock power when you need it." desc="Choose a tier that matches your workflow today — upgrade when your team grows." />
          <Spotlight className="mt-10 grid md:grid-cols-3 gap-5">
            {tiers.map((t)=>(
              <div key={t.name} className={"glass rounded-2xl p-6 shadow-soft " + (t.popular ? "border-white/25" : "")}>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-extrabold">{t.name}</div>
                  {t.popular ? <div className="badge">Most popular</div> : null}
                </div>
                <div className="mt-2 text-sm text-white/65">{t.price}</div>
                <div className="mt-5 space-y-2 text-sm">
                  {t.points.map(p=>(
                    <div key={p} className="flex items-start gap-2 text-white/80">
                      <CheckCircle2 size={16} className="mt-0.5 text-kx-blue" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" className={"mt-6 w-full " + (t.popular ? "btn-primary" : "btn-secondary")}>Get pricing</a>
              </div>
            ))}
          </Spotlight>
          <div className="mt-8 text-sm text-white/60">Want Kryvexis to match your exact workflow? We can customize onboarding, import paths, and reports.</div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="section relative">
        <Container>
          <SectionHeading kicker="Questions" title="FAQ" desc="Quick answers to common questions." />
          <Spotlight className="mt-10 grid md:grid-cols-2 gap-5">
            {faqs.map(x=>(
              <div key={x.q} className="glass rounded-2xl p-6">
                <div className="font-bold">{x.q}</div>
                <div className="mut mt-2 text-sm leading-relaxed">{x.a}</div>
              </div>
            ))}
          </Spotlight>
        </Container>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section relative">
        <Container>
          <div className="glass rounded-2xl p-8 md:p-10 shadow-glow">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="badge mb-4">Pilot-ready</div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Want a demo that looks premium?</h3>
                <p className="mut mt-3 leading-relaxed">Tell us your industry and workflow. We’ll set up a demo with your product categories and a realistic stock flow.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="badge">Fast onboarding</span>
                  <span className="badge">Practical controls</span>
                  <span className="badge">Inventory first</span>
                </div>
              </div>

              <div className="w-full md:w-[380px]">
                <div className="glass rounded-2xl p-5">
                  <div className="text-sm font-semibold">Request early access</div>
                  <div className="mt-3 grid gap-3">
                    <input className="glass rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25" placeholder="Name" />
                    <input className="glass rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25" placeholder="Email or WhatsApp" />
                    <input className="glass rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25" placeholder="Business name" />
                    <button className="btn-primary w-full">Send request</button>
                    <div className="text-xs text-white/50">UI-only for now. Connect it to email/CRM when ready.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
