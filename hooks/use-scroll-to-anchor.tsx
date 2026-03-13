import { useEffect } from "react";

const smoothScrollTo = (targetEl: Element, offset = 0) => {
  const start = window.scrollY;
  const end = targetEl.getBoundingClientRect().top + window.scrollY - offset;
  const distance = end - start;
  const duration = 1200;
  let startTime: number | null = null;

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

export const useScrollToAnchor = () => {
  useEffect(() => {
    const anchor = sessionStorage.getItem("scrollTo");
    if (!anchor) return;
    sessionStorage.removeItem("scrollTo");

    // Wait for page to fully render
    const timer = setTimeout(() => {
      const el = document.querySelector(anchor);
      if (el) smoothScrollTo(el, 500); // ← 200px offset for cross-page
    }, 300);

    return () => clearTimeout(timer);
  }, []);
};
