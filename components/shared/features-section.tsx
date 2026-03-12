import Image from "next/image";
import Link from "next/link";

interface Props {
  reverse?: boolean;
  eyebrow?: string;
  title: string;
  em: string;
  body: string[];
  imgSrc: string;
  imgAlt?: string;
  cta?: string;
  ctaHref?: string;
}

export default function FeatureSection({
  reverse = false,
  eyebrow,
  title,
  em,
  body,
  imgSrc,
  imgAlt = "",
  cta,
  ctaHref = "#",
}: Props) {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-325 mx-auto px-5 sm:px-8 lg:px-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
            reverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* ── Text column ── */}
          <div
            className={`flex flex-col gap-4 ${reverse ? "lg:[direction:ltr]" : ""}`}
          >
            {/* Eyebrow */}
            {eyebrow && (
              <div className="flex items-center gap-2">
                <span className="block h-px w-5 bg-[#24a9e1]" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#24a9e1] font-medium">
                  {eyebrow}
                </span>
              </div>
            )}

            {/* Headline */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-slate-900">
                {title}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Image
                  src="/logo-shape.png"
                  alt=""
                  width={36}
                  height={20}
                  className="h-4 w-auto object-contain"
                />
                <span className="font-sans text-sm font-semibold text-[#24a9e1] tracking-[-0.01em]">
                  {em}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-8 bg-[#24a9e1]/25" />

            {/* Body paragraphs */}
            <div className="flex flex-col gap-3">
              {body.map((para, i) => (
                <p
                  key={i}
                  className="font-sans text-sm leading-relaxed text-slate-500"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* CTA */}
            {cta && (
              <div className="mt-1">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.07em] uppercase px-5 py-2.5 rounded-sm bg-[#24a9e1] text-white transition-all duration-200 hover:bg-[#1a95cc] hover:-translate-y-px shadow-sm shadow-[#24a9e1]/25 hover:shadow-md"
                >
                  {cta}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h8M6.5 3l3.5 3-3.5 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* ── Image column ── */}
          <div className={`relative ${reverse ? "lg:[direction:ltr]" : ""}`}>
            {/* Decorative accent behind image */}
            <div className="absolute -inset-3 rounded-xl bg-[#24a9e1]/6 -z-10" />

            <div className="relative overflow-hidden rounded-lg shadow-lg shadow-black/10 aspect-4/3 w-full">
              <Image
                src={imgSrc}
                alt={imgAlt}
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              />
              {/* Subtle inner shadow for depth */}
              <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] rounded-lg pointer-events-none" />
            </div>

            {/* Floating stat badge */}
            {/* <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white rounded-lg px-4 py-3 shadow-md shadow-black/10 border border-slate-100 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#24a9e1]/10">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8z"
                    stroke="#24a9e1"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M8 5v3l2 2"
                    stroke="#24a9e1"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p className="font-sans text-[10px] text-slate-400 tracking-wide uppercase font-medium">
                  Capacity
                </p>
                <p className="font-sans text-sm font-bold text-slate-800 leading-tight">
                  Up to 24 guests
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
