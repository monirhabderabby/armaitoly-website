// components/shared/dynamic-title.tsx
"use client";

import { useDynamicTitle } from "@/hooks/useDynamicTitle";

export default function DynamicTitle({ pageKey }: { pageKey: string }) {
  useDynamicTitle(pageKey);
  return null;
}
