import { Property } from "@/types/property";
import Image from "next/image";
import Link from "next/link";

function WaveDecoration() {
  return (
    <Image src="/logo-shape.png" alt="logo-shape" width={36} height={22} />
  );
}

interface VillaCardProps {
  data: Property;
  reversed?: boolean;
}

export default function PropertyCard({
  data: villa,
  reversed = false,
}: VillaCardProps) {
  return (
    <article
      className={`
        group relative grid grid-cols-1 lg:grid-cols-2
        rounded-xl overflow-hidden border border-slate-100
        bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]
        hover:shadow-[0_6px_28px_rgba(0,0,0,0.10)]
        transition-shadow duration-500 max-w-4xl w-full mx-auto min-h-60
        ${reversed ? "lg:[direction:rtl]" : ""}
      `}
    >
      {/* ── image panel ── */}
      <div className="relative overflow-hidden min-h-52 lg:min-h-0 [direction:ltr]">
        <Image
          src={villa.image}
          alt={villa.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/5 to-transparent pointer-events-none" />

        {/* location pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 shadow-sm">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#24a9e1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-[10px] font-semibold text-slate-700 tracking-wide">
            {villa.city}, {villa.state}
          </span>
        </div>
      </div>

      {/* ── content panel ── */}
      <div className="flex flex-col justify-between [direction:ltr] bg-white">
        {/* header */}
        <div className="px-5 pt-5 pb-4 ">
          <div className="flex items-center gap-1.5 mb-1.5">
            <WaveDecoration />
            <p className="font-serif italic text-[#24a9e1] text-[0.78rem] m-0">
              Views and Expansiveness
            </p>
          </div>

          <h2 className="text-[1.1rem] font-bold text-[#0f1f2e] leading-tight tracking-tight m-0 mb-2.5">
            {villa.name}
          </h2>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Available
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              Verified
            </span>
          </div>
        </div>

        {/* cta */}
        <div className="px-5 py-4 flex items-center justify-between gap-3 border-t border-slate-100">
          <div>
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest m-0">
              Direction
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${villa.latitude},${villa.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#24a9e1] hover:text-[#1a95cc] transition-colors"
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Directions
            </a>
          </div>

          <Link
            href={`/property/all/${villa.propId}`}
            className="
              inline-flex items-center gap-1.5
              text-[11px] font-semibold tracking-[0.05em] uppercase
              px-4 py-2 rounded-lg
              bg-[#0f1f2e] text-white
              hover:bg-[#1a3550]
              transition-all duration-200 hover:-translate-y-px
              shadow-sm shadow-[#0f1f2e]/20
            "
          >
            View property
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
