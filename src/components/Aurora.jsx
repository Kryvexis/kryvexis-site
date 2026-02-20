export default function Aurora(){
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-45 animate-aurora"
           style={{background:"radial-gradient(circle at 30% 30%, rgba(34,197,94,0.55), transparent 60%)"}} />
      <div className="absolute top-10 -right-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 animate-aurora"
           style={{background:"radial-gradient(circle at 30% 30%, rgba(34,211,238,0.55), transparent 60%)"}} />
      <div className="absolute -bottom-40 left-1/3 h-[620px] w-[620px] rounded-full blur-3xl opacity-35 animate-aurora"
           style={{background:"radial-gradient(circle at 30% 30%, rgba(167,139,250,0.55), transparent 60%)"}} />
      <div className="absolute inset-0 grid-overlay" />
    </div>
  );
}
