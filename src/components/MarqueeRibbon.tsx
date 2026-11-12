export function MarqueeRibbon() {
  const items = [
    'Python',
    'Web Development',
    'Artificial Intelligence',
    'HTML',
    'CSS',
    'JOY UNIVERSITY',
    'Continuous Learning',
    'Problem Solving',
  ];

  const track = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="relative z-10 overflow-hidden border-y border-white/10 bg-white/[0.02] py-3.5"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {track.map((label, idx) => (
          <div key={`${label}-${idx}`} className="flex items-center gap-8">
            <span className="font-display text-xs font-medium tracking-wider text-slate-400 sm:text-sm">
              {label}
            </span>
            <span className="text-sky-400/60">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
