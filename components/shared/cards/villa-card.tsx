import { Villa } from "@/types/property";
import Image from "next/image";
import Link from "next/link";

// ── helpers ────────────────────────────────────────────────────────────────
function getBedrooms(bedroom: string[]): number {
  return bedroom.filter((b) => b.toLowerCase().includes("bed")).length;
}

function getViewLabel(location: string): string {
  if (location.toLowerCase().includes("beach")) return "Sea View";
  if (location.toLowerCase().includes("garden")) return "Garden View";
  if (location.toLowerCase().includes("roof")) return "Ocean View";
  return location;
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

function WaveDecoration() {
  return (
    <Image src="/logo-shape.png" alt="logo-shape" width={50} height={30} />
  );
}

// ── types ──────────────────────────────────────────────────────────────────
interface VillaCardProps {
  data: Villa;
  reversed?: boolean;
}

// ── component ──────────────────────────────────────────────────────────────
export default function VillaCard({
  data: villa,
  reversed = false,
}: VillaCardProps) {
  const maxGuests = villa.capacity.baseGuests;
  const bedrooms = getBedrooms(villa.bedroom);
  const viewLabel = getViewLabel(villa.location);

  const firstLine = villa.description.split("\n")[0];
  const secondLine =
    villa.description
      .split("\n")
      .find((l) => l.trim().length > 40 && l.trim() !== firstLine.trim()) ?? "";

  const specs = [
    { icon: <GuestIcon />, label: `2–${maxGuests} Guests` },
    {
      icon: <BedroomIcon />,
      label: `${bedrooms} Bedroom${bedrooms !== 1 ? "s" : ""}`,
    },
    { icon: <ViewIcon />, label: viewLabel },
    { icon: <SizeIcon />, label: "300 qm" },
  ];

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
      <div className="relative overflow-hidden min-h-65 md:min-h-0 [direction:ltr]">
        <Image
          src={villa.images[0]}
          alt={villa.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* subtle overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-black/10 to-transparent pointer-events-none" />
      </div>

      {/* ── content ── */}
      <div className="flex flex-col justify-center gap-2.5 px-4 py-10 md:px-11 [direction:ltr]">
        {/* name */}
        <h2 className=" text-[1.50rem] font-semibold text-[#1a2e3b] leading-tight tracking-tight m-0">
          {villa.name}
        </h2>

        <WaveDecoration />

        {/* tagline */}
        <p className="font-serif italic text-[#24a9e1] text-[0.95rem] m-0">
          Views and Expansiveness
        </p>

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
          {specs.map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 text-[#4a6274] min-w-14"
            >
              <span className="text-[#24a9e1]">{icon}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* cta */}
        <Link
          href={`/property/${villa.name}/${villa.roomId}`}
          className="inline-flex w-fit items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.07em] uppercase px-5 py-2.5 rounded-sm bg-[#24a9e1] text-white transition-all duration-200 hover:bg-[#1a95cc] hover:-translate-y-px shadow-sm shadow-[#24a9e1]/25 hover:shadow-md cursor-pointer"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
