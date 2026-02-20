import Starfield from "./Starfield";

export default function Aurora(){
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      <Starfield />
      <div className="absolute -top-36 -left-28 h-[560px] w-[560px] rounded-full blur-3xl opacity-45 animate-aurora"
           style={{background:"radial-gradient(circle at 30% 30%, rgba(18,161,238,0.60), transparent 60%)"}} />
      <div className="absolute top-8 -right-28 h-[520px] w-[520px] rounded-full blur-3xl opacity-38 animate-aurora"
           style={{background:"radial-gradient(circle at 30% 30%, rgba(34,211,238,0.55), transparent 60%)"}} />
      <div className="absolute -bottom-44 left-1/3 h-[640px] w-[640px] rounded-full blur-3xl opacity-34 animate-aurora"
           style={{background:"radial-gradient(circle at 30% 30%, rgba(167,139,250,0.50), transparent 62%)"}} />
      <div className="absolute inset-0 grid-overlay" />
    </div>
  );
}
