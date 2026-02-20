export default function SectionHeading({ kicker, title, desc }){
  return (
    <div className="max-w-2xl">
      {kicker ? <div className="badge mb-4">{kicker}</div> : null}
      <h2 className="h2">{title}</h2>
      {desc ? <p className="mut mt-3 leading-relaxed">{desc}</p> : null}
    </div>
  );
}
