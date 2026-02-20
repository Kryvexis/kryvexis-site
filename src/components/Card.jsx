import { ArrowUpRight } from "lucide-react";

export function Card({ title, desc, icon:Icon, pills=[] }){
  return (
    <div className="glass rounded-2xl p-6 shadow-soft hover:border-white/20 transition relative">
      <div className="flex items-start justify-between gap-4">
        <div className="h-11 w-11 rounded-2xl glass grid place-items-center">
          {Icon ? <Icon size={18} /> : null}
        </div>
        <ArrowUpRight className="opacity-40" size={18} />
      </div>
      <div className="mt-4 font-bold text-lg">{title}</div>
      <div className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</div>
      {pills?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {pills.map(p=>(<span key={p} className="badge">{p}</span>))}
        </div>
      ) : null}
    </div>
  );
}
