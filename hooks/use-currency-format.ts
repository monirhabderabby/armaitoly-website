"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Rates {
  [currency: string]: number;
}

export function useCurrencyFormat() {
  const searchParams = useSearchParams();
  const selectedCurrency = searchParams.get("currency") ?? "THB";

  const [rates, setRates] = useState<Rates | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchRates() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/exchange-rates?base=${selectedCurrency}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (!cancelled) setRates(data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchRates();
    return () => {
      cancelled = true;
    };
  }, [selectedCurrency]); // re-fetch when currency changes

  function convert(amount: number, from: string, to: string): number | null {
    if (!rates) return null;

    const fromRate = rates[from.toUpperCase()];
    const toRate = rates[to.toUpperCase()];

    if (!fromRate || !toRate) return amount;
    if (from.toUpperCase() === to.toUpperCase()) return amount;

    const inUSD = amount / fromRate;
    return Math.round(inUSD * toRate * 100) / 100;
  }

  function format(amount: number, from: string): string {
    if (!rates) return `${amount.toLocaleString()} ${from}`;

    const converted = convert(amount, from, selectedCurrency);
    if (converted === null || isNaN(converted)) {
      return `${amount.toLocaleString()} ${from}`;
    }
    return `${converted.toFixed(2)} ${selectedCurrency}`;
  }

  function getConvertedAmount(amount: number, from: string): number | null {
    if (!rates) return null;

    const converted = convert(amount, from, selectedCurrency);
    if (converted === null || isNaN(converted)) return null;

    return converted; // ✅ only number
  }

  return {
    format,
    convert,
    getConvertedAmount,
    selectedCurrency,
    isLoading,
    isError,
  };
}
