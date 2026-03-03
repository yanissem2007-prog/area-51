function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 text-sand/70">
      <p className="font-body text-xs tracking-[0.35em]">SCROLL</p>
      <div className="h-14 w-6 rounded-full border border-sand/40 p-1">
        <div className="mx-auto h-3 w-1 animate-floatSlow rounded-full bg-sand/70" />
      </div>
    </div>
  );
}

export default ScrollIndicator;
