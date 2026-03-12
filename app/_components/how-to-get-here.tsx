import Image from "next/image";

export default function HowToGetHere() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Subtle tinted background wash */}
      <div className="absolute inset-0  pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left: Map ── */}
          <div className="relative flex items-center justify-center">
            {/* Soft glow ring behind map */}
            <div className="absolute inset-0 m-auto w-72 h-72 rounded-full bg-[rgba(36,169,225,0.08)] blur-2xl" />

            {/* Map image */}
            <div className="relative z-10 w-full max-w-sm">
              <Image
                src="/map.png"
                alt="Map of Koh Phangan showing Jay Beach Villas location"
                width={480}
                height={480}
                className="w-full h-auto drop-shadow-md"
              />
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="flex flex-col gap-5">
            {/* Section label */}
            <div className="flex items-center gap-2">
              <span className="block h-px w-6 bg-[#24a9e1]" />
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#24a9e1] font-medium">
                Location
              </span>
            </div>

            {/* Headline */}
            <div>
              <h2 className=" text-2xl sm:text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-slate-900">
                How to get here
              </h2>
              {/* Logo-shape accent underline */}
              <div className="flex items-center gap-2 mt-1.5">
                <Image
                  src="/logo-shape.png"
                  alt=""
                  width={32}
                  height={18}
                  className="h-4 w-auto object-contain"
                />
                <span className="font-sans text-sm font-semibold text-[#24a9e1] tracking-[-0.01em]">
                  we are located on Hin Kong Beach
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-10 bg-[#24a9e1]/30" />

            {/* Body copy */}
            <div className="flex flex-col gap-3">
              <p className=" text-sm leading-relaxed text-slate-500">
                Our resort is about{" "}
                <span className="text-slate-700 font-medium">
                  10 minutes by scooter or taxi
                </span>{" "}
                away from Tong Sala Pier.
              </p>
              <p className="font-sans text-sm leading-relaxed text-slate-500">
                You can reach Tong Sala Pier via Ferry from{" "}
                <span className="text-slate-700 font-medium">
                  Samui and Surat Thani
                </span>{" "}
                many times during the day.
              </p>
            </div>

            {/* Transport chips */}
            <div className="flex flex-wrap gap-2 mt-1">
              {[
                { icon: "🛵", label: "Scooter · 10 min" },
                { icon: "🚕", label: "Taxi · 10 min" },
                { icon: "⛴️", label: "Ferry from Samui" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 font-sans text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-full px-3 py-1.5 tracking-wide"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-2">
              <a
                href="#directions"
                className="inline-flex items-center gap-2  text-xs font-semibold tracking-[0.06em] uppercase px-5 py-2.5 rounded-sm bg-[#24a9e1] text-white transition-all duration-200 hover:bg-[#1a95cc] hover:-translate-y-px shadow-sm shadow-[#24a9e1]/30 hover:shadow-md hover:shadow-[#24a9e1]/25"
              >
                Check how to get here
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="opacity-80"
                >
                  <path
                    d="M2 6h8M6.5 3l3.5 3-3.5 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
