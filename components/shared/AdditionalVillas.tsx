"use client";
import { useAccomodationVillas } from "@/hooks/accommodation/use-accommodation-villas";
import { Villa } from "@/types/property";
import Image from "next/image";
import Link from "next/link";

interface AdditionalVillasProps {
  currentRoomId: string;
}

export function AdditionalVillas({ currentRoomId }: AdditionalVillasProps) {
  const { data, isLoading, isError } = useAccomodationVillas();

  const villas: Villa[] =
    data?.data.filter((villa) => villa.roomId !== currentRoomId) ?? [];

  if (isLoading) {
    return (
      <section className="py-12">
        <h2 className="text-2xl font-semibold mb-6">More Villas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-gray-100 animate-pulse h-64"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError || villas.length === 0) return null;

  return (
    <section className="py-12 px-4 max-w-325 mx-auto">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">
        More Villas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
        {villas.map((villa) => (
          <VillaCard key={villa.roomId} villa={villa} />
        ))}
      </div>
    </section>
  );
}

function VillaCard({ villa }: { villa: Villa }) {
  return (
    <Link
      href={`/property/${villa.name}/${villa.roomId}`}
      className="group flex flex-col rounded-lg overflow-hidden border border-gray-200 hover:border-[#24a9e1] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 bg-white"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        {villa.images?.[0] ? (
          <Image
            src={villa.images[0].url}
            alt={villa.images[0].alt || villa.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            No image
          </div>
        )}
        {/* Location badge */}
        <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wider bg-white/90 text-gray-600 px-2 py-0.5 rounded-sm z-10">
          {villa.locationType}
        </span>
      </div>
      {/* Content */}
      <div className="flex flex-col flex-1 p-2.5 gap-1.5">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1 group-hover:text-[#24a9e1] transition-colors">
          {villa.name}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-1">{villa.location}</p>

        {/* Bedrooms & bathrooms */}
        <div className="flex gap-3 text-xs text-gray-500 mt-0.5">
          {villa.bedroom?.length > 0 && (
            <span>🛏 {villa.bedroom.length} bed</span>
          )}
          {villa.bathroom?.length > 0 && (
            <span>🚿 {villa.bathroom.length} bath</span>
          )}
          {villa.capacity?.baseGuests > 0 && (
            <span>👤 {villa.capacity.baseGuests} guests</span>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex items-baseline justify-between">
          <span className="text-sm font-bold text-gray-900">
            {villa.price.currency} {villa.price.amount.toLocaleString()}
          </span>
          <span className="text-[10px] text-gray-400">/ {villa.price.per}</span>
        </div>
      </div>
    </Link>
  );
}
