import { useEffect, useState } from "react";

interface Rates {
  [currency: string]: number;
}

interface UseCurrencyConverterReturn {
  rates: Rates | null;
  isLoading: boolean;
  isError: boolean;
  convert: (amount: number, from: string, to: string) => number | null;
}

// Always fetch from USD base — rates never need to re-fetch when currency changes
export function useCurrencyConverter(): UseCurrencyConverterReturn {
  const [rates, setRates] = useState<Rates | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchRates() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("https://api.frankfurter.app/latest?base=USD");
        if (!res.ok) throw new Error("Failed to fetch rates");
        const data = await res.json();
        if (!cancelled) {
          setRates({ ...data.rates, USD: 1 });
        }
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
  }, []); // ← empty dep array: fetch once, done

  function convert(amount: number, from: string, to: string): number | null {
    if (!rates) return null;
    if (from === to) return amount;
    // amount → USD → target
    const inUSD = amount / (rates[from] ?? 1);
    const result = inUSD * (rates[to] ?? 1);
    return Math.round(result * 100) / 100;
  }

  return { rates, isLoading, isError, convert };
}
