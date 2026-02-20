"use client";
import { useMemo, useState } from "react";
import { Send } from "lucide-react";

const EMAIL = "kryvexissolutions@gmail.com";
const WA = "+27686282874";

export default function ContactCard(){
  const [name,setName]=useState("");
  const [contact,setContact]=useState("");
  const [biz,setBiz]=useState("");

  const message = useMemo(()=>{
    const parts = [
      "Hi Kryvexis! I would like a demo / early access.",
      name ? `Name: ${name}` : null,
      contact ? `Contact: ${contact}` : null,
      biz ? `Business: ${biz}` : null,
    ].filter(Boolean);
    return parts.join("\n");
  },[name,contact,biz]);

  const waHref = useMemo(()=>{
    const digits = WA.replace(/\D/g,"");
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  },[message]);

  const mailHref = useMemo(()=>{
    const subj = encodeURIComponent("Kryvexis OS Demo Request");
    const body = encodeURIComponent(message);
    return `mailto:${EMAIL}?subject=${subj}&body=${body}`;
  },[message]);

  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-sm font-semibold">Contact Kryvexis</div>

      <div className="mt-3 grid gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} className="glass rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25" placeholder="Name" />
        <input value={contact} onChange={e=>setContact(e.target.value)} className="glass rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25" placeholder="Email or WhatsApp" />
        <input value={biz} onChange={e=>setBiz(e.target.value)} className="glass rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25" placeholder="Business name" />

        <a className="btn-primary w-full text-center inline-flex items-center justify-center gap-2" href={waHref} target="_blank" rel="noreferrer">
          <Send size={16}/> Send on WhatsApp
        </a>

        <a className="btn-secondary w-full text-center" href={mailHref}>
          Email instead
        </a>

        <div className="text-xs text-white/50">Email: {EMAIL} • WhatsApp: +27 68 628 2874</div>
      </div>
    </div>
  );
}
