"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconChevronLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconCreditCard = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const IconUser = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconShield = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt4 = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const fmtExp = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
};

const LabelInner = ({
  icon,
  text,
}: {
  icon?: React.ReactNode;
  text: string;
}) => (
  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400">
    {icon}
    {text}
  </span>
);

// ─── Schema ───────────────────────────────────────────────────────────────────
export const cardSchema = z.object({
  number: z
    .string()
    .transform((v) => v.replace(/\s/g, ""))
    .pipe(z.string().min(16, "Enter a valid 16-digit number")),
  expiry: z.string().min(5, "Enter valid expiry MM/YY"),
  cvv: z.string().min(3, "Enter valid CVV"),
  name: z.string().min(1, "Name on card is required"),
});

export type CardData = z.infer<typeof cardSchema>;

// Raw (display) form values before zod transforms
type CardFormValues = {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
};

// ─── Component ────────────────────────────────────────────────────────────────
interface CardInfoFormProps {
  currency: string;
  total: number;
  loading?: boolean;
  onBack: () => void;
  onSubmit: (data: CardData) => void | Promise<void>;
}

export function CardInfoForm({
  currency,
  total,
  loading = false,
  onBack,
  onSubmit,
}: CardInfoFormProps) {
  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: { number: "", expiry: "", cvv: "", name: "" },
  });

  // Live preview values
  const watchNumber = useWatch({
    control: form.control,
    name: "number",
  });
  const watchExpiry = useWatch({
    control: form.control,
    name: "expiry",
  });
  const watchName = useWatch({
    control: form.control,
    name: "name",
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-gray-100 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center rounded-full border border-gray-200 bg-white p-1.5 shadow-sm transition hover:border-gray-300 hover:shadow"
        >
          <IconChevronLeft />
        </button>
        <div>
          <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-gray-400">
            Card Information
          </h3>
          <p className="text-sm text-gray-500">
            Your payment is encrypted and secure.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-6 py-6 grid gap-6"
        >
          {/* ── Card visual ─────────────────────────────────────────────────── */}
          <div
            className="relative overflow-hidden rounded-2xl p-5 text-white"
            style={{
              background:
                "linear-gradient(135deg,#1e293b 0%,#0f172a 60%,#1e3a5f 100%)",
              minHeight: "160px",
            }}
          >
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-12 -right-8 h-40 w-40 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-8 -left-6 h-28 w-28 rounded-full bg-white/5" />

            {/* Top row */}
            <div className="relative flex justify-between items-start mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Credit Card
              </p>
              {/* Mastercard-style circles */}
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-red-500/80" />
                <div className="-ml-3 h-7 w-7 rounded-full bg-yellow-400/80" />
              </div>
            </div>

            {/* Card number */}
            <p className="relative mb-5 font-mono text-base tracking-[0.18em]">
              {watchNumber || "•••• •••• •••• ••••"}
            </p>

            {/* Cardholder + expiry */}
            <div className="relative flex justify-between text-xs">
              <div>
                <p className="mb-0.5 text-white/40 uppercase tracking-widest text-[10px]">
                  Cardholder
                </p>
                <p className="font-semibold uppercase">
                  {watchName || "Full Name"}
                </p>
              </div>
              <div className="text-right">
                <p className="mb-0.5 text-white/40 uppercase tracking-widest text-[10px]">
                  Expires
                </p>
                <p className="font-semibold">{watchExpiry || "MM/YY"}</p>
              </div>
            </div>
          </div>

          {/* ── Card fields ──────────────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Card number */}
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <LabelInner icon={<IconCreditCard />} text="Card Number" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={field.value}
                      onChange={(e) => field.onChange(fmt4(e.target.value))}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <LabelInner text="Expiry Date" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MM/YY"
                        maxLength={5}
                        value={field.value}
                        onChange={(e) => field.onChange(fmtExp(e.target.value))}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <LabelInner text="CVV" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value.replace(/\D/g, "").slice(0, 4),
                          )
                        }
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Name on card */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <LabelInner icon={<IconUser />} text="Name on Card" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full name as on card"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ── Submit ───────────────────────────────────────────────────────── */}
          <div className="space-y-3">
            <Button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#24a9e1" }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Processing Payment…
                </>
              ) : (
                `Pay ${currency} ${total.toLocaleString()}`
              )}
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
              <IconShield /> 256-bit SSL · PCI DSS Compliant
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
