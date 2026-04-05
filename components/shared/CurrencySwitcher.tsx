"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CURRENCIES = [
  { code: "USD", symbol: "$", flag: "🇺🇸", name: "US Dollar" },
  { code: "EUR", symbol: "€", flag: "🇪🇺", name: "Euro" },
  { code: "GBP", symbol: "£", flag: "🇬🇧", name: "British Pound" },
  { code: "JPY", symbol: "¥", flag: "🇯🇵", name: "Japanese Yen" },
  { code: "CAD", symbol: "CA$", flag: "🇨🇦", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", flag: "🇦🇺", name: "Australian Dollar" },
  { code: "INR", symbol: "₹", flag: "🇮🇳", name: "Indian Rupee" },
  { code: "BDT", symbol: "৳", flag: "🇧🇩", name: "Bangladeshi Taka" },
  { code: "CHF", symbol: "Fr", flag: "🇨🇭", name: "Swiss Franc" },
  { code: "SGD", symbol: "S$", flag: "🇸🇬", name: "Singapore Dollar" },
  { code: "AED", symbol: "د.إ", flag: "🇦🇪", name: "UAE Dirham" },
  { code: "SAR", symbol: "﷼", flag: "🇸🇦", name: "Saudi Riyal" },
  { code: "THB", symbol: "฿", flag: "🇹🇭", name: "Thai Baht" },
];

interface Props {
  defaultCurrency: string;
}

export default function CurrencySwitcher({ defaultCurrency }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL param takes priority → falls back to defaultCurrency → falls back to USD
  const currentCode =
    searchParams.get("currency") ??
    (CURRENCIES.some((c) => c.code === defaultCurrency)
      ? defaultCurrency
      : "USD");

  const selected =
    CURRENCIES.find((c) => c.code === currentCode) ?? CURRENCIES[0];

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.name.toLowerCase().includes(query.toLowerCase()),
  );

  function handleSelect(code: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("currency", code);
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
    setQuery("");
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!searchParams.get("currency")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(
        "currency",
        CURRENCIES.some((c) => c.code === defaultCurrency)
          ? defaultCurrency
          : "USD",
      );
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [defaultCurrency, router, searchParams, pathname]);

  return (
    <div className="flex justify-end w-full pb-5">
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-background text-sm hover:bg-muted transition-colors"
        >
          <span>{selected.flag}</span>
          <span className="font-medium">{selected.code}</span>
          <span className="text-muted-foreground">{selected.symbol}</span>
          <svg
            className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-1.5 z-50 w-52 rounded-xl border border-border bg-background shadow-md">
            <div className="p-1.5">
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-md border border-border bg-muted px-3 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <ul className="max-h-60 overflow-y-auto p-1.5 pt-0">
              {filtered.map((c) => (
                <li key={c.code}>
                  <button
                    onClick={() => handleSelect(c.code)}
                    className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted ${
                      c.code === selected.code ? "bg-muted font-medium" : ""
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span className="font-medium">{c.code}</span>
                    <span className="flex-1 text-xs text-muted-foreground">
                      {c.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {c.symbol}
                    </span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-3 py-4 text-center text-sm text-muted-foreground">
                  No results
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
