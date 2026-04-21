import { Villa } from "@/types/property";
import Image from "next/image";
import Link from "next/link";

// ── helpers ────────────────────────────────────────────────────────────────
function getBedroomCount(featureCodes: string[][]): number {
  for (const group of featureCodes) {
    for (const code of group) {
      const match = code.match(/^BEDROOMS_(\d+)$/);
      if (match) return parseInt(match[1], 10);
    }
  }
  return 1;
}

function hasLivingSleepingCombo(featureCodes: string[][]): boolean {
  return featureCodes.some((group) =>
    group.includes("BEDROOM_LIVING_SLEEPING_COMBO"),
  );
}

// ── icons ──────────────────────────────────────────────────────────────────
function GuestIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BedroomIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ViewIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
    </svg>
  );
}

function SizeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18" />
    </svg>
  );
}

function SofaIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
      <path d="M2 11a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4H2v-4z" />
      <path d="M4 15v2M20 15v2" />
    </svg>
  );
}

function WaveDecoration() {
  return (
    <Image src="/logo-shape.png" alt="logo-shape" width={50} height={30} />
  );
}

// ── types ──────────────────────────────────────────────────────────────────
interface VillaCardProps {
  data: Villa;
  reversed?: boolean;
  startDate?: string;
  endDate?: string;
}

// ── component ──────────────────────────────────────────────────────────────
export default function VillaCard({
  data: villa,
  reversed = false,
  startDate,
  endDate,
}: VillaCardProps) {
  const maxGuests = villa.roomDetails?.maxPeople ?? 0;
  const bedroomCount = getBedroomCount(villa._featureCodes ?? []);
  const hasCombo = hasLivingSleepingCombo(villa._featureCodes ?? []);

  const specs: { icon: React.ReactNode; label: React.ReactNode }[] = [
    { icon: <GuestIcon />, label: `${maxGuests} Guests` },
    {
      icon: <BedroomIcon />,
      label: `${bedroomCount} Bedroom${bedroomCount !== 1 ? "s" : ""}`,
    },
    ...(hasCombo ? [{ icon: <SofaIcon />, label: "1 Sofa" }] : []),
    { icon: <ViewIcon />, label: villa.location },
    { icon: <SizeIcon />, label: "60 sqm" },
  ];

  const firstLine = villa.description.split("\n")[0];
  const secondLine =
    villa.description
      .split("\n")
      .find((l) => l.trim().length > 40 && l.trim() !== firstLine.trim()) ?? "";

  return (
    <article
      className={`
    group grid grid-cols-1 md:grid-cols-2 min-h-85
    rounded-sm overflow-hidden border-gray-400/50 border
    bg-white transition-shadow duration-300 
    ${reversed ? "md:[direction:rtl]" : ""}
  `}
    >
      {/* ── image ── */}
      {villa.images.length > 0 && (
        <div className="relative overflow-hidden min-h-65 md:min-h-0 [direction:ltr]">
          <Image
            src={villa.images[0].url}
            alt={villa.images[0].alt ?? villa.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* subtle overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-black/10 to-transparent pointer-events-none" />
        </div>
      )}

      {/* ── content ── */}
      <div className="flex flex-col justify-center gap-2.5 px-4 py-10 md:px-11 [direction:ltr]">
        {/* name */}
        <h2 className=" text-[1.50rem] font-semibold text-[#1a2e3b] leading-tight tracking-tight m-0">
          {villa.name}
        </h2>

        <div className="flex items-center gap-x-1.5">
          <WaveDecoration />

          {/* tagline */}
          <p className="font-serif italic text-[#24a9e1] text-[0.95rem] m-0">
            Views and Expansiveness
          </p>
        </div>

        {/* description */}
        <p className="text-[0.875rem] text-slate-500 leading-relaxed m-0 line-clamp-2">
          {firstLine}
        </p>
        {secondLine && (
          <p className="text-[0.875rem] text-slate-500 leading-relaxed m-0 line-clamp-2">
            {secondLine}
          </p>
        )}

        {/* specs */}
        <div className="flex flex-wrap gap-5 mt-2 pt-4 border-t border-slate-100">
          {specs.map(({ icon, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 text-[#4a6274] min-w-14"
            >
              <span className="text-[#24a9e1]">{icon}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-center">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* cta */}
        <Link
          href={{
            pathname: `/property/${villa.name}/${villa.roomId}`,
            query: {
              ...(startDate && { startDate }),
              ...(endDate && { endDate }),
            },
          }}
          className="inline-flex w-fit items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.07em] uppercase px-5 py-2.5 rounded-sm bg-[#24a9e1] text-white transition-all duration-200 hover:bg-[#1a95cc] hover:-translate-y-px shadow-sm shadow-[#24a9e1]/25 hover:shadow-md cursor-pointer"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
