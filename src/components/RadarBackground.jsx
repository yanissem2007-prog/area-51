function RadarBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-16 top-1/4 h-72 w-72 rounded-full border border-olive/20" />
      <div className="absolute right-8 top-32 h-56 w-56 rounded-full border border-olive/20" />
      <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full border border-olive/15" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(58,74,63,0.2),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(139,0,0,0.1),transparent_36%)]" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-sand/5" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-sand/5" />
      <div className="absolute right-[10%] top-[15%] h-80 w-80 rounded-full border border-olive/20 animate-radar">
        <div className="mx-auto h-1/2 w-px bg-gradient-to-b from-transparent via-sand/60 to-transparent" />
      </div>
    </div>
  );
}

export default RadarBackground;
