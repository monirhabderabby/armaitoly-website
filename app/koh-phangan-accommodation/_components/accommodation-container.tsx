"use client";

import VillaCard from "@/components/shared/cards/villa-card";
import VillaCardSkeleton from "@/components/shared/skeleton/villa-card-skleton";
import { useAccomodationVillas } from "@/hooks/accommodation/use-accommodation-villas";

// ── container ──────────────────────────────────────────────────────────────
export default function AccommodationContainer() {
  const { data, isLoading, isError } = useAccomodationVillas();
  const villas = data?.data ?? [];

  return (
    <section className="w-full bg-[#f9fbfc] py-16">
      <div className="max-w-325 mx-auto px-6 flex flex-col gap-12">
        {isLoading && (
          <>
            <VillaCardSkeleton />
            <VillaCardSkeleton />
            <VillaCardSkeleton />
          </>
        )}

        {isError && (
          <p className="text-center text-slate-400 py-12 text-base">
            Unable to load villas. Please try again later.
          </p>
        )}

        {!isLoading &&
          !isError &&
          villas.map((villa, idx) => (
            <VillaCard
              key={villa.roomId}
              data={villa}
              reversed={idx % 2 !== 0}
            />
          ))}
      </div>
    </section>
  );
}
