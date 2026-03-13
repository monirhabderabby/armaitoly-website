"use client";

import { useGetSingleProperty } from "@/hooks/property/use-get-single-property";
import Image from "next/image";
import { useState } from "react";

// ─── Icons (inline SVG to avoid extra deps) ──────────────────────────────────
const IconChevronLeft = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevronRight = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconMapPin = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconUsers = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconMoon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconShield = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconShare = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const IconCheck = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconWifi = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);
const IconStar = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-gray-100 ${className}`} />
);

// ─── Pill / Tag ───────────────────────────────────────────────────────────────
const Tag = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
    <IconCheck />
    {label}
  </span>
);

// ─── Section heading ──────────────────────────────────────────────────────────
const SectionHeading = ({ title }: { title: string }) => (
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
    {title}
  </h3>
);

// ─── Main Component ───────────────────────────────────────────────────────────
interface SinglePropertyContainerProps {
  roomId: string;
}

export default function SinglePropertyContainer({
  roomId,
}: SinglePropertyContainerProps) {
  const { data, isLoading, isError } = useGetSingleProperty(roomId);
  const [activeImage, setActiveImage] = useState(0);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <Skeleton className="mb-4 h-120 w-full" />
        <div className="mt-6 grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div>
            <Skeleton className="h-72 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-red-50 p-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-800">
          Failed to load villa details
        </p>
        <p className="text-sm text-gray-500">Please try again later.</p>
      </div>
    );
  }

  const villa = data.data;
  const images = villa.images ?? [];

  // ── Helpers ────────────────────────────────────────────────────────────────
  const prevImage = () =>
    setActiveImage((p) => (p === 0 ? images.length - 1 : p - 1));
  const nextImage = () =>
    setActiveImage((p) => (p === images.length - 1 ? 0 : p + 1));

  const amenities = villa.amenities;
  const kitchen = villa.kitchen;

  const poolAndWellness = villa.poolAndWellness;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      {/* ── Image Gallery ─────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-md"
        style={{ height: "480px" }}
      >
        {images.length > 0 && (
          <Image
            src={images[activeImage]}
            alt={villa.name}
            fill
            className="object-cover transition-all duration-500"
            priority
            unoptimized
          />
        )}

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition hover:bg-white hover:scale-105"
            >
              <IconChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition hover:bg-white hover:scale-105"
            >
              <IconChevronRight />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {activeImage + 1} / {images.length}
        </div>
      </div>

      {/* ── Thumbnails ────────────────────────────────────────────────────── */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                i === activeImage
                  ? "border-[#24a9e1] shadow-md shadow-[#24a9e1]/20"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <Image
                src={src}
                alt={`Villa image ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Content Grid ──────────────────────────────────────────────────── */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ── LEFT: Details ───────────────────────────────────────────────── */}
        <div className="space-y-8 lg:col-span-2">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-white"
                  style={{ backgroundColor: "#24a9e1" }}
                >
                  {villa.locationType}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {villa.name}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                <IconMapPin />
                {villa.location}
              </p>
            </div>
            <button className="flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm transition hover:border-gray-300 hover:shadow">
              <IconShare /> Share
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                icon: <IconUsers />,
                label: "Base Guests",
                value: `${villa.capacity.baseGuests} guests`,
              },
              {
                icon: <IconMoon />,
                label: "Min. Stay",
                value: `${villa.minimumStay[0]?.nights ?? "—"} nights`,
              },
              {
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
                label: "Bedrooms",
                value: villa.bedroom.length,
              },
              {
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12h16M4 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
                  </svg>
                ),
                label: "Bathrooms",
                value: villa.bathroom.length,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <p className="mb-1 flex items-center gap-1.5 text-xs text-gray-400">
                  {stat.icon} {stat.label}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <SectionHeading title="About This Villa" />
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
              {villa.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Amenities */}
            <div>
              <SectionHeading title="Amenities" />
              <div className="flex flex-wrap gap-2">
                {amenities.map((a) => (
                  <Tag key={a} label={a} />
                ))}
              </div>
            </div>

            {/* Kitchen */}
            <div>
              <SectionHeading title="kitchen" />
              <div className="flex flex-wrap gap-2">
                {kitchen.map((a) => (
                  <Tag key={a} label={a} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* poolAndWellness */}
            <div>
              <SectionHeading title="Pool And Wellness" />
              <div className="flex flex-wrap gap-2">
                {poolAndWellness.map((a) => (
                  <Tag key={a} label={a} />
                ))}
              </div>
            </div>

            {/* Internet */}
            <div className="md:mx-auto">
              <SectionHeading title="Internet" />
              <div className="flex flex-wrap gap-2">
                {villa.internet.map((i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#24a9e1]/30 bg-[#24a9e1]/5 px-3 py-1 text-xs font-medium text-[#24a9e1]"
                  >
                    <IconWifi /> {i}
                  </span>
                ))}
              </div>
            </div>
            {/* Location */}
            <div className="md:mx-auto">
              <SectionHeading title="Location" />
              <div className="flex flex-wrap gap-2">
                {villa.locationFeatures.map((a) => (
                  <Tag key={a} label={a} />
                ))}
              </div>
            </div>
          </div>

          {/* Bedroom & Bathroom */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <SectionHeading title="Bedroom" />
              <ul className="space-y-2">
                {villa.bedroom.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#24a9e1]/10 text-[#24a9e1]">
                      <IconCheck />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <SectionHeading title="Bathroom" />
              <ul className="space-y-2">
                {villa.bathroom.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#24a9e1]/10 text-[#24a9e1]">
                      <IconCheck />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Minimum Stay */}
          <div>
            <SectionHeading title="Minimum Stay Policy" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {villa.minimumStay.map((stay, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
                >
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Months</p>
                    <p className="text-sm font-medium text-gray-700">
                      {stay.months}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">Min. Nights</p>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "#24a9e1" }}
                    >
                      {stay.nights}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pets */}
          {villa.pets?.length > 0 && (
            <div>
              <SectionHeading title="Pet Policy" />
              <div className="flex flex-wrap gap-2">
                {villa.pets.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600"
                  >
                    🐾 {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Booking Card ──────────────────────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 overflow-hidden">
            {/* Price header */}
            <div className="px-6 pt-6 pb-5 border-b border-gray-100">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-gray-900">
                  {villa.price.amount.toLocaleString()}
                </span>
                <span className="mb-0.5 text-sm font-semibold text-gray-500">
                  {villa.price.currency} / {villa.price.per}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Base rate for up to {villa.capacity.baseGuests} guests
              </p>
            </div>

            {/* Offers */}
            {villa.offers?.length > 0 && (
              <div className="px-6 py-4 border-b border-gray-100 bg-[#24a9e1]/5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#24a9e1]">
                  Special Offers
                </p>
                <ul className="space-y-1.5">
                  {villa.offers.map((offer) => (
                    <li
                      key={offer}
                      className="flex items-start gap-2 text-xs text-gray-700"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#24a9e1] text-white">
                        <IconStar />
                      </span>
                      {offer}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fees */}
            <div className="px-6 py-4 space-y-3 border-b border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Extra guest fee</span>
                <span className="font-medium text-gray-800">
                  +{villa.capacity.extraGuestFee} {villa.capacity.currency} /
                  guest
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <IconShield /> Security deposit
                </span>
                <span className="font-medium text-gray-800">
                  {villa.securityDeposit.toLocaleString()}{" "}
                  {villa.price.currency}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Cleaning fee</span>
                <span className="font-medium text-gray-800">
                  {villa.cleaningFee === 0
                    ? "Free"
                    : `${villa.cleaningFee} ${villa.price.currency}`}
                </span>
              </div>
              {villa.taxPercent > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-medium text-gray-800">
                    {villa.taxPercent}%
                  </span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="px-6 py-5">
              <button
                className="w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
                style={{ backgroundColor: "#24a9e1" }}
              >
                Check Availability
              </button>
              <p className="mt-3 text-center text-xs text-gray-400">
                No charges made until booking confirmed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
