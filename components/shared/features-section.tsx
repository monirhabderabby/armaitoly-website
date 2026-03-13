import { cn } from "@/lib/utils";
import Image from "next/image";
import FeatureCTA from "./feature-cta";

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
  accent?: string;
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
  accent,
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
              <h2 className=" text-2xl sm:text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-slate-900">
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
            {cta && <FeatureCTA cta={cta} ctaHref={ctaHref} />}
          </div>

          {/* ── Image column ── */}
          <div
            className={`relative group ${reverse ? "lg:[direction:ltr]" : ""}`}
          >
            {/* Color shape */}
            <div className="absolute inset-0 bg-[#24A9E1] rounded-lg -z-10 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />

            {/* Decorative accent */}
            <div className="absolute -inset-3 rounded-xl bg-[#24a9e1]/6 -z-20" />

            <div className="relative  rounded-lg shadow-lg shadow-black/10 aspect-4/3 w-full">
              <Image
                src={imgSrc}
                alt={imgAlt}
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03] z-30"
              />
              {/* Inner shadow */}
              <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] rounded-lg pointer-events-none" />

              {accent && (
                <div className="relative w-full h-full left-12">
                  <div
                    className={cn(
                      " absolute inset-0 w-auto h-full top-10 left-0 z-10 rounded-none",
                      accent,
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
