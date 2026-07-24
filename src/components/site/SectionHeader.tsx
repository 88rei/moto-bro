export function SectionHeader({ title, tag }: { title: string; tag?: string }) {
  return (
    <div className="flex items-baseline justify-between mb-8">
      <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight">{title}</h2>
      {tag && <span className="font-mono text-[10px] text-primary uppercase">[{tag}]</span>}
    </div>
  );
}
