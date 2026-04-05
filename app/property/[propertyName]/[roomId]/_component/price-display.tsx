"use client";

import { useCurrencyFormat } from "@/hooks/use-currency-format";

export default function PriceDisplay({
  amount,
  fromCurrency,
  per,
  baseGuests,
}: {
  amount: number;
  fromCurrency: string;
  per: string;
  baseGuests: number;
}) {
  const { format, selectedCurrency, isLoading } = useCurrencyFormat();

  return (
    <div className="px-6 pt-6 pb-5 border-b border-gray-100">
      <div className="flex items-end gap-2">
        {isLoading ? (
          <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-100" />
        ) : (
          <>
            <span className="text-3xl font-extrabold text-gray-900">
              {format(amount, fromCurrency)}
            </span>
            <span className="mb-0.5 text-sm font-semibold text-gray-500">
              / {per}
            </span>
          </>
        )}
      </div>
      {!isLoading && selectedCurrency !== fromCurrency && (
        <p className="mt-1 text-xs text-gray-400">
          Originally {amount.toLocaleString()} {fromCurrency}
        </p>
      )}
      <p className="mt-1 text-xs text-gray-400">
        Base rate for up to {baseGuests} guests
      </p>
    </div>
  );
}
