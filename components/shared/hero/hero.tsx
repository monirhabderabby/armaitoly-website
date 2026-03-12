"use client";

import AvailabilityCheckerHero, {
  AvailabilityCheckData,
} from "@/components/shared/hero/availabilityCheckerHero";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

// This is a Server Component (no "use client" directive)
export default function Hero() {
  const router = useRouter();
  const onCheckAvailability = (data: AvailabilityCheckData) => {
    const params = new URLSearchParams({
      checkIn: data.checkIn.toISOString(),
      checkOut: data.checkOut.toISOString(),
      adults: data.adults.toString(),
      children: data.children.toString(),
      nights: data.nights.toString(),
      totalGuests: data.totalGuests.toString(),
    });

    router.push(`/availability?${params.toString()}`);
  };
  return (
    <section className="relative w-full h-screen min-h-150 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero/hero.png"
        alt="JOY Beach Villas - Koh Phangan"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Smooth Black Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/60 z-10" />

      {/* Additional top gradient for navbar readability */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 text-center">
        {/* Heading */}
        <div className="mb-3 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
            Welcome To{" "}
            <span className="relative inline-block">
              JOY
              {/* Decorative swoosh accent under JOY */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 9 Q30 2, 50 6 Q70 10, 95 3"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            Beach Villas
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-wide mb-12 drop-shadow">
          Celebrate The Good Life on Koh Phangan
        </p>

        {/* Availability Checker */}
        <AvailabilityCheckerHero onCheck={onCheckAvailability} />
      </div>

      {/* Scroll to down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2  flex flex-col items-center gap-1 text-white/70 z-10">
        <span className="text-xs tracking-widest uppercase font-medium">
          Scroll to down
        </span>
        <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center animate-bounce">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
}
