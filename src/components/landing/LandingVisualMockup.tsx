/**
 * Placeholder visual abstracto (sin imágenes remotas ni capturas).
 */
export function LandingVisualMockup() {
  return (
    <div
      className="relative mx-auto w-full max-w-[320px] select-none sm:max-w-[380px]"
      aria-hidden
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#c9a962]/12 via-transparent to-wine-900/40 blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#c9a962]/25 bg-gradient-to-b from-[#1f1418] to-[#120a0e] p-1 shadow-2xl shadow-black/50">
        <div className="rounded-[1.5rem] bg-gradient-to-b from-[#2a1c22] to-[#151015] p-4 pb-6">
          {/* status bar fake */}
          <div className="mb-4 flex items-center justify-between px-1">
            <span className="text-[10px] font-medium tracking-widest text-[#c9a962]/70">
              CARTA DIGITAL
            </span>
            <div className="h-1 w-8 rounded-full bg-white/10" />
          </div>
          {/* faux menu header */}
          <div className="mb-4 rounded-xl border border-white/5 bg-black/20 px-3 py-2.5">
            <div className="h-2 w-24 rounded bg-[#c9a962]/40" />
            <div className="mt-2 h-1.5 w-40 rounded bg-white/15" />
          </div>
          {/* wine row */}
          <div className="mb-3 flex gap-3 rounded-xl border border-white/5 bg-wine-950/50 p-3">
            <div className="relative flex h-14 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-wine-800/90 to-wine-950">
              <div className="absolute inset-1 rounded-md border border-[#c9a962]/20 bg-gradient-to-t from-transparent to-[#c9a962]/10" />
              <div className="relative h-6 w-2 rounded-full bg-wine-600/90 shadow-inner" />
            </div>
            <div className="min-w-0 flex-1 space-y-2 pt-0.5">
              <div className="h-2 w-4/5 max-w-[140px] rounded bg-white/20" />
              <div className="h-1.5 w-full max-w-[180px] rounded bg-white/10" />
              <div className="flex gap-2 pt-1">
                <span className="rounded-full bg-[#c9a962]/15 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#d4bc7a]">
                  Copa
                </span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-stone-500">
                  Botella
                </span>
              </div>
            </div>
          </div>
          {/* cocktail row */}
          <div className="mb-3 flex gap-3 rounded-xl border border-white/5 bg-wine-950/40 p-3">
            <div className="relative flex h-14 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-amber-950/50 to-stone-950">
              <div className="absolute bottom-2 left-1/2 h-5 w-5 -translate-x-1/2 rounded-b-full border border-[#c9a962]/15 border-t-0 bg-gradient-to-b from-stone-700/40 to-transparent" />
              <div className="relative mt-1 h-2 w-2 rounded-full bg-[#c9a962]/35" />
            </div>
            <div className="min-w-0 flex-1 space-y-2 pt-0.5">
              <div className="h-2 w-3/5 max-w-[120px] rounded bg-white/18" />
              <div className="h-1.5 w-full max-w-[160px] rounded bg-white/08" />
            </div>
          </div>
          {/* bottom nav fake */}
          <div className="mt-4 flex justify-center gap-6 border-t border-white/5 pt-3">
            <div className="h-1 w-10 rounded-full bg-[#c9a962]/50" />
            <div className="h-1 w-10 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
