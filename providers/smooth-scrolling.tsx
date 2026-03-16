"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SmoothScrolling({ children }: Props) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        // Tell Lenis to leave any element with data-lenis-prevent alone.
        // This stops it from calling preventDefault on wheel events inside
        // those elements, restoring native scroll to them.
        prevent: (node: Element) =>
          node.closest("[data-lenis-prevent]") !== null,
      }}
    >
      {children}
    </ReactLenis>
  );
}
