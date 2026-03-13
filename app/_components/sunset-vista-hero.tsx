import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  em?: string;
  imgSrc: string;
  scrollView?: boolean;
  className?: string;
}

export default function SunsetVistaHero({
  title,
  description,
  em,
  imgSrc,
  scrollView = true,
  className,
}: Props) {
  return (
    <section
      className={cn(
        className,
        "relative w-full py-20 max-h-195 h-auto overflow-hidden flex items-center justify-center",
      )}
    >
      {/* ── Fixed background image ── */}
      <div className="absolute inset-0 -z-10 ">
        <Image
          src={imgSrc}
          alt="Hin Kong Bay tropical villa with infinity pool"
          fill
          priority
          className="object-fill object-center fixed"
        />

        <div className="absolute inset-0 bg-black/50" />

        {/* Radial centre vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_52%,rgba(10,14,20,0.65)_0%,rgba(10,14,20,0.15)_100%)]" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-linear-to-b from-transparent to-[rgba(8,12,18,0.55)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl mx-auto ">
        {/* Headline */}
        <h2 className=" text-3xl sm:text-4xl md:text-4xl font-bold leading-[1.06] tracking-[-0.02em] text-white mb-2.5 animate-[fadeUp_0.6s_80ms_cubic-bezier(.22,1,.36,1)_both]">
          {title}
          <br />
          {em && (
            <em className="italic font-normal text-[rgba(255,235,185,0.93)]">
              {em}
            </em>
          )}
        </h2>

        {/* Body */}
        <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/60 max-w-sm sm:max-w-md mb-6 animate-[fadeUp_0.65s_160ms_cubic-bezier(.22,1,.36,1)_both]">
          {description}
        </p>

        {/* Scroll nudge */}
        {scrollView && (
          <div className="mt-5 flex flex-col items-center gap-1.5 opacity-35 animate-[fadeUp_0.7s_360ms_cubic-bezier(.22,1,.36,1)_both]">
            <span className="font-mono text-[8px] tracking-[0.22em] uppercase text-white">
              Scroll
            </span>
            <span className="block w-px h-6 bg-white/50 animate-[scrollPulse_1.9s_ease-in-out_infinite]" />
          </div>
        )}
      </div>
    </section>
  );
}
