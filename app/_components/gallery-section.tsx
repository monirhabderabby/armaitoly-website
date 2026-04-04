"use client";

import { useAccomodationVillas } from "@/hooks/accommodation/use-accommodation-villas";
import { Villa } from "@/types/property";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function GallerySection() {
  const router = useRouter();
  const { data, isLoading, isError } = useAccomodationVillas();

  const [activeVillaIndex, setActiveVillaIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const gridVillas: Villa[] = (() => {
    const villas = (data?.data ?? [])
      .filter((v) => v.images.length > 0)
      .slice(0, 5);
    // Swap Beachfront Villa (index 0) with Garden Pool Villa 1 (index 3)
    const beachfrontIdx = villas.findIndex(
      (v) => v.name === "Beachfront Villa",
    );
    const gardenPoolIdx = villas.findIndex(
      (v) => v.name === "Garden Pool Villa 1",
    );
    if (beachfrontIdx !== -1 && gardenPoolIdx !== -1) {
      [villas[beachfrontIdx], villas[gardenPoolIdx]] = [
        villas[gardenPoolIdx],
        villas[beachfrontIdx],
      ];
    }
    return villas;
  })();

  const activeVilla =
    activeVillaIndex !== null ? gridVillas[activeVillaIndex] : null;
  const activeImages = activeVilla?.images ?? [];
  const totalImages = activeImages.length;

  const openModal = (villaIndex: number) => {
    setActiveVillaIndex(villaIndex);
    setActiveImageIndex(0);
  };

  const closeModal = () => {
    setActiveVillaIndex(null);
    setActiveImageIndex(0);
  };

  const goNext = useCallback(() => {
    if (totalImages <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const goPrev = useCallback(() => {
    if (totalImages <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  useEffect(() => {
    if (activeVillaIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeVillaIndex, goNext, goPrev]);

  useEffect(() => {
    document.body.style.overflow = activeVillaIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVillaIndex]);

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#f7fafa]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mx-auto" />
            <div className="h-7 w-56 bg-gray-200 rounded animate-pulse mx-auto" />
            <div className="h-4 w-72 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
          {/* Mobile skeleton: single column */}
          <div className="flex flex-col gap-3 md:hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 rounded-xl animate-pulse w-full"
              />
            ))}
          </div>
          {/* Desktop skeleton: two columns */}
          <div className="hidden md:flex gap-3 h-130">
            <div className="flex flex-col gap-3 w-[38%]">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-1 bg-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <div className="h-[60%] bg-gray-200 rounded-xl animate-pulse" />
              <div className="flex-1 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || gridVillas.length === 0) {
    return (
      <section className="py-16 px-4 bg-[#f7fafa]">
        <div className="max-w-6xl mx-auto text-center text-gray-400 py-20">
          No gallery images available.
        </div>
      </section>
    );
  }

  const leftVillas = gridVillas.slice(0, 3);
  const rightTop = gridVillas[3];
  const rightBottom = gridVillas[4];

  return (
    <section className="py-16 px-4 bg-[#f7fafa]">
      {/* ── Section Header ── */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
            <path
              d="M2 10 C7 4, 13 4, 18 7 S29 14, 34 4"
              stroke="#38b2ac"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="text-[#38b2ac] font-semibold text-sm tracking-widest uppercase">
            Our Gallery
          </span>
          <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
            <path
              d="M2 4 C7 14, 13 14, 18 7 S29 0, 34 10"
              stroke="#38b2ac"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
        <h2 className="text-xl md:text-3xl font-bold text-[#1a3c4d] mb-3 tracking-tight">
          Life at Joy Koh Phangan
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Step inside our world — from sun-drenched villas to serene
          beachfronts, every corner is crafted for your perfect escape.
        </p>
      </div>

      {/* ── Mobile: single column stack ── */}
      <div className="max-w-6xl mx-auto flex flex-col gap-3 md:hidden">
        {gridVillas.map((villa, i) => (
          <div key={villa.roomId} className="relative h-52 w-full">
            <GalleryCard
              villa={villa}
              index={i}
              className="h-full"
              onOpen={openModal}
            />
          </div>
        ))}
      </div>

      {/* ── Desktop: vertical 5-piece grid ── */}
      <div className="max-w-6xl mx-auto hidden md:flex gap-3 h-130">
        {/* Left column — up to 3 villas stacked equally */}
        <div className="flex flex-col gap-3 w-[38%]">
          {leftVillas.map((villa, i) => (
            <GalleryCard
              key={villa.roomId}
              villa={villa}
              index={i}
              className="flex-1"
              onOpen={openModal}
            />
          ))}
        </div>

        {/* Right column — tall (60%) + medium (40%) */}
        <div className="flex flex-col gap-3 flex-1">
          {rightTop && (
            <GalleryCard
              villa={rightTop}
              index={3}
              className="h-[60%]"
              onOpen={openModal}
            />
          )}
          {rightBottom && (
            <GalleryCard
              villa={rightBottom}
              index={4}
              className="flex-1"
              onOpen={openModal}
            />
          )}
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      {activeVillaIndex !== null && activeVilla && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          {/* Close */}
          <button
            onClick={closeModal}
            className="fixed top-3 right-3 md:top-4 md:right-4 z-60 flex items-center gap-1.5 text-white/70 hover:text-white transition-colors group"
            aria-label="Close gallery"
          >
            <span className="hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-wide">
              Close
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center">
              <X size={18} />
            </div>
          </button>

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          />

          {/* Modal card */}
          <div
            className="relative z-10 w-full max-w-5xl flex flex-col items-center"
            style={{ animation: "scaleIn 0.25s ease" }}
          >
            {/* Counter + villa name */}
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <span className="text-white/60 text-sm tabular-nums">
                {activeImageIndex + 1}
                <span className="text-white/30 mx-1">/</span>
                {totalImages}
              </span>
              <span className="text-white/70 text-sm font-medium text-right truncate max-w-[60%]">
                {activeVilla.name}
              </span>
            </div>

            {/* Main image */}
            <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div
                key={`${activeVillaIndex}-${activeImageIndex}`}
                className="relative w-full"
                style={{
                  height: "clamp(220px, 55vw, 65vh)",
                  animation: "imgFadeIn 0.3s ease",
                }}
              >
                <Image
                  src={activeImages[activeImageIndex].url}
                  alt={activeImages[activeImageIndex].alt || activeVilla.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>

              {/* Prev / Next — only when more than 1 image */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/40 hover:bg-[#38b2ac]/80 border border-white/15 hover:border-[#38b2ac] flex items-center justify-center text-white transition-all duration-200 active:scale-95"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-black/40 hover:bg-[#38b2ac]/80 border border-white/15 hover:border-[#38b2ac] flex items-center justify-center text-white transition-all duration-200 active:scale-95"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* View villa link */}
            <button
              onClick={() =>
                router.push(
                  `/property/${activeVilla.name}/${activeVilla.roomId}`,
                )
              }
              className="mt-3 text-[#38b2ac] text-xs tracking-widest uppercase hover:underline"
            >
              View Villa →
            </button>

            {/* Thumbnail strip — only when more than 1 image */}
            {totalImages > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto max-w-full pb-1 px-1 scrollbar-none">
                {activeImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={[
                      "shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200",
                      i === activeImageIndex
                        ? "border-[#38b2ac] opacity-100 scale-105"
                        : "border-transparent opacity-40 hover:opacity-80",
                    ].join(" ")}
                    aria-label={`Image ${i + 1}`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img.url}
                        alt={img.alt || `Image ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="52px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes scaleIn {
          from { opacity:0; transform:scale(0.96) translateY(8px); }
          to   { opacity:1; transform:scale(1)    translateY(0);   }
        }
        @keyframes imgFadeIn {
          from { opacity:0; transform:scale(0.98); }
          to   { opacity:1; transform:scale(1);    }
        }
        .scrollbar-none::-webkit-scrollbar { display:none; }
        .scrollbar-none { -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>
    </section>
  );
}

// ── GalleryCard ───────────────────────────────────────────────────────────────
interface GalleryCardProps {
  villa: Villa;
  index: number;
  className?: string;
  onOpen: (villaIndex: number) => void;
}

function GalleryCard({
  villa,
  index,
  className = "",
  onOpen,
}: GalleryCardProps) {
  const img = villa.images[0];
  if (!img) return null;

  return (
    <div
      onClick={() => onOpen(index)}
      className={`relative overflow-hidden rounded-xl cursor-pointer group ${className}`}
    >
      <Image
        src={img.url}
        alt={img.alt || villa.name}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0d3340]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
        <span className="text-white text-[11px] font-medium tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300 line-clamp-1">
          {villa.name}
        </span>
      </div>

      {/* Multi-image badge */}
      {villa.images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
          {villa.images.length} photos
        </div>
      )}

      {/* Teal corner accent */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-24 border-l-24px border-t-[#38b2ac] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-180" />
    </div>
  );
}
