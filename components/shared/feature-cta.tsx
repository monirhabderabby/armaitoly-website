"use client";
import { useScrollToAnchor } from "@/hooks/use-scroll-to-anchor";
import { useRouter } from "nextjs-toploader/app";

interface Props {
  cta: string;
  ctaHref: string;
}

const smoothScrollTo = (targetEl: Element) => {
  const start = window.scrollY;
  const end = targetEl.getBoundingClientRect().top + window.scrollY;
  const distance = end - start;
  const duration = 1200; // ms — increase for slower
  let startTime: number | null = null;

  // Ease in-out cubic — slow start, slow end
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const FeatureCTA = ({ cta, ctaHref }: Props) => {
  const router = useRouter();

  useScrollToAnchor();

  const handleCtaClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    // Case 1: Pure anchor "#eco" → smooth scroll same page
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) smoothScrollTo(el);
      return;
    }

    // Case 2: "/contact#contact" → save anchor, then navigate
    if (href.includes("#")) {
      const anchor = "#" + href.split("#")[1];
      sessionStorage.setItem("scrollTo", anchor);
      router.push(href.split("#")[0]); // navigate without the hash
      return;
    }

    // Case 3: "/about" or external → normal navigation
    router.push(href);
  };
  return (
    <div>
      {cta && (
        <div className="mt-1">
          <button
            onClick={(e) => handleCtaClick(e, ctaHref)}
            className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.07em] uppercase px-5 py-2.5 rounded-sm bg-[#24a9e1] text-white transition-all duration-200 hover:bg-[#1a95cc] hover:-translate-y-px shadow-sm shadow-[#24a9e1]/25 hover:shadow-md cursor-pointer"
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
          </button>
        </div>
      )}
    </div>
  );
};

export default FeatureCTA;
