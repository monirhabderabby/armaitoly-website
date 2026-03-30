"use client";

import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  span?: "tall" | "wide" | "normal";
}

// ── Sample data – swap in your real images ──────────────────────────────────
const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    alt: "Beachfront sunset view",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    alt: "Villa infinity pool",
    span: "normal",
  },
  {
    src: "https://images.pexels.com/photos/26743211/pexels-photo-26743211.jpeg?w=800&q=80",
    alt: "Tropical garden pathway",
    span: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    alt: "Ocean bedroom suite",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    alt: "Private dining terrace",
    span: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&q=80",
    alt: "Koh Phangan coastline",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80",
    alt: "Outdoor lounge area",
    span: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    alt: "Luxury villa interior",
    span: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80",
    alt: "Outdoor lounge area",
    span: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    alt: "Luxury villa interior",
    span: "normal",
  },
];
// ────────────────────────────────────────────────────────────────────────────

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openModal = (index: number) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % GALLERY_IMAGES.length);
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex(
      (activeIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    );
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, goNext, goPrev]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <section className="py-20 px-4 bg-[#f7fafa] ">
      {/* ── Section Header ── */}
      <div className="max-w-325 mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          {/* Teal wave accent matching site branding */}
          <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
            <path
              d="M2 10 C7 4, 13 4, 18 7 S29 14, 34 4"
              stroke="#38b2ac"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
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
        <p className="text-gray-500 max-w-xl mx-auto  md:text-base leading-relaxed">
          Step inside our world — from sun-drenched villas to serene
          beachfronts, every corner is crafted for your perfect escape.
        </p>
      </div>

      {/* ── Masonry Grid ── */}
      <div className="max-w-6xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={i}
            onClick={() => openModal(i)}
            className={[
              "relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid",
              img.span === "tall" ? "row-span-2" : "",
            ].join(" ")}
          >
            {/* Image */}
            <div
              className="relative w-full"
              style={{
                height:
                  img.span === "tall"
                    ? "380px"
                    : img.span === "wide"
                      ? "220px"
                      : "200px",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0d3340]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex items-center gap-1.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <Images size={14} className="text-white/80" />
                <span className="text-white text-xs font-medium tracking-wide">
                  {img.alt}
                </span>
              </div>
            </div>

            {/* Teal corner accent on hover */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-28 border-l-28 border-t-[#38b2ac] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-180" />
          </div>
        ))}
      </div>

      {/* ── Lightbox Modal ── */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={closeModal}
          />

          {/* Modal card */}
          <div
            className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center overflow-y-auto"
            style={{ animation: "scaleIn 0.25s ease" }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-36 md:-top-24 right-0 flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm font-medium group"
              aria-label="Close gallery"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-wide">
                Close
              </span>
              <div className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors">
                <X size={18} />
              </div>
            </button>

            {/* Counter */}
            <div className="absolute -top-12 left-0 text-white/60 text-sm font-medium tabular-nums">
              {activeIndex + 1} <span className="text-white/30">/</span>{" "}
              {GALLERY_IMAGES.length}
            </div>

            {/* Image wrapper */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div
                key={activeIndex}
                className="relative w-full"
                style={{ height: "65vh", animation: "imgFadeIn 0.3s ease" }}
              >
                <Image
                  src={GALLERY_IMAGES[activeIndex].src}
                  alt={GALLERY_IMAGES[activeIndex].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                />
              </div>

              {/* Left nav */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-[#38b2ac]/80 border border-white/15 hover:border-[#38b2ac] flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Right nav */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-[#38b2ac]/80 border border-white/15 hover:border-[#38b2ac] flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Caption */}
            <p className="mt-4 text-white/60 text-sm tracking-wide text-center">
              {GALLERY_IMAGES[activeIndex].alt}
            </p>

            {/* Thumbnail strip */}
            <div className="mt-4 flex flex-wrap gap-2 overflow-x-auto max-w-full pb-1 px-1 scrollbar-none">
              {GALLERY_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={[
                    "shrink-0 w-10 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200",
                    i === activeIndex
                      ? "border-[#38b2ac] opacity-100 scale-105"
                      : "border-transparent opacity-50 hover:opacity-80",
                  ].join(" ")}
                  aria-label={`View ${img.alt}`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="46px"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Keyframe animations (injected once) ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        @keyframes imgFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1);    }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
