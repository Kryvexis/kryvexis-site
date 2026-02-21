export default function SectionHeading({ kicker, title, desc }){
  return (
    <div className="max-w-2xl" data-parallax="8">
      {kicker ? <div className="badge mb-4">{kicker}</div> : null}
      <h2 className="h2 relative">
        {title}
        <span aria-hidden className="absolute -bottom-2 left-0 h-[1px] w-20 bg-white/20" />
      </h2>
      {desc ? <p className="mut mt-3 leading-relaxed">{desc}</p> : null}
    </div>
  );
}
