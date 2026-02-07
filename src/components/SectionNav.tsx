"use client";

const items = [
  { id: "specs", label: "Capabilities" },
  { id: "technology", label: "How it works" },
  { id: "impact", label: "Impact" },
  { id: "proof", label: "Proof" },
  { id: "faq", label: "FAQ" },
];

export default function SectionNav() {
  return (
    <div className="sticky top-16 z-40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap gap-2">
        {items.map((x) => (
          <a
            key={x.id}
            href={`#${x.id}`}
            className="k-chip rounded-full px-3 py-1 text-xs font-semibold text-[color:var(--k-muted)] hover:text-white transition"
          >
            {x.label}
          </a>
        ))}
      </div>
    </div>
  );
}
