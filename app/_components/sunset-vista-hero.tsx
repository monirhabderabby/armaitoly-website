import Image from "next/image";

export default function SunsetVistaHero() {
  return (
    <section className="relative w-full min-h-150 max-h-195 h-auto overflow-hidden flex items-center justify-center">
      {/* ── Fixed background image ── */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/sunset.png"
          alt="Hin Kong Bay tropical villa with infinity pool"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Radial centre vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_52%,rgba(10,14,20,0.65)_0%,rgba(10,14,20,0.15)_100%)]" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-linear-to-b from-transparent to-[rgba(8,12,18,0.55)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl mx-auto select-none">
        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.06] tracking-[-0.02em] text-white mb-2.5 animate-[fadeUp_0.6s_80ms_cubic-bezier(.22,1,.36,1)_both]">
          Your perfect view
          <br />
          <em className="italic font-normal text-[rgba(255,235,185,0.93)]">
            of the sunset.
          </em>
        </h2>

        {/* Body */}
        <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/60 max-w-sm sm:max-w-md mb-6 animate-[fadeUp_0.65s_160ms_cubic-bezier(.22,1,.36,1)_both]">
          Behold the magnificent sunset best witnessed at Hin Kong Bay. Breathe
          the fresh air breezing through the beautiful tropical gardens. Dip
          your toes in the infinity pools.
        </p>

        {/* Scroll nudge */}
        <div className="mt-10 flex flex-col items-center gap-1.5 opacity-35 animate-[fadeUp_0.7s_360ms_cubic-bezier(.22,1,.36,1)_both]">
          <span className="font-mono text-[8px] tracking-[0.22em] uppercase text-white">
            Scroll
          </span>
          <span className="block w-px h-6 bg-white/50 animate-[scrollPulse_1.9s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
