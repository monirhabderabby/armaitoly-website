"use client";

import { useCurrencyConverter } from "@/hooks/use-currency-converter";
import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";

interface CurrencyContextValue {
  selectedCurrency: string;
  convert: (amount: number, from: string, to: string) => number | null;
  isLoading: boolean;
  isError: boolean;
  format: (amount: number, from: string) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({
  children,
  fallbackCurrency = "USD",
}: {
  children: ReactNode;
  fallbackCurrency?: string;
}) {
  // ✅ Reads live from URL on every render — reacts to searchParam changes
  const searchParams = useSearchParams();
  const selectedCurrency = searchParams.get("currency") ?? fallbackCurrency;

  // ✅ Rates are fixed to USD base — no re-fetch when currency changes
  const { convert, isLoading, isError } = useCurrencyConverter();

  // When rates are null it falls back to raw amount + FROM currency — not selected
  function format(amount: number, from: string): string {
    const converted = convert(amount, from, selectedCurrency);
    if (converted === null) return "..."; // ← don't show stale currency during load
    return `${converted.toLocaleString()} ${selectedCurrency}`;
  }

  return (
    <CurrencyContext.Provider
      value={{ selectedCurrency, convert, isLoading, isError, format }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx)
    throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}
