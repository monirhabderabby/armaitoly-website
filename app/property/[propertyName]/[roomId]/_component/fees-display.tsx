import { IconShield } from "@/constants/icons";
import { useCurrencyFormat } from "@/hooks/use-currency-format";

export default function FeesDisplay({
  extraGuestFee,
  securityDeposit,
  cleaningFee,
  taxPercent,
  fromCurrency,
}: {
  extraGuestFee: number;
  securityDeposit: number;
  cleaningFee: number;
  taxPercent: number;
  fromCurrency: string;
}) {
  const { format, isLoading } = useCurrencyFormat();

  const loader = (
    <span className="h-4 w-16 animate-pulse rounded bg-gray-100 inline-block" />
  );

  return (
    <div className="px-6 py-4 space-y-3 border-b border-gray-100">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Extra guest fee</span>
        <span className="font-medium text-gray-800">
          {isLoading
            ? loader
            : `+${format(extraGuestFee, fromCurrency)} / guest`}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-gray-500">
          <IconShield /> Security deposit
        </span>
        <span className="font-medium text-gray-800">
          {isLoading ? loader : format(securityDeposit, fromCurrency)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Cleaning fee</span>
        <span className="font-medium text-gray-800">
          {cleaningFee === 0
            ? "Free"
            : isLoading
              ? loader
              : format(cleaningFee, fromCurrency)}
        </span>
      </div>
      {taxPercent > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Tax</span>
          <span className="font-medium text-gray-800">{taxPercent}%</span>
        </div>
      )}
    </div>
  );
}
