"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";

// ─── Icons ────────────────────────────────────────────────────────────────────
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
const IconMail = () => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPhone = () => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.8a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2 .84h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMapPin = () => (
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconClock = () => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ─── Schema ───────────────────────────────────────────────────────────────────
export const guestSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  postcode: z.string().optional(),
  country: z.string().optional(),
  arrivalTime: z.string().optional(),
  comment: z.string().optional(),
});

export type GuestData = z.infer<typeof guestSchema>;

// ─── Shared label style ───────────────────────────────────────────────────────
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

// ─── Component ────────────────────────────────────────────────────────────────
interface GuestInfoFormProps {
  defaultValues?: Partial<GuestData>;
  onNext: (data: GuestData) => void;
}

export function GuestInfoForm({ defaultValues, onNext }: GuestInfoFormProps) {
  const form = useForm<GuestData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postcode: "",
      country: "",
      arrivalTime: "",
      comment: "",
      ...defaultValues,
    },
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-gray-100">
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-gray-400">
          Guest Information
        </h3>
        <p className="text-sm text-gray-500">
          Tell us who&apos;s staying at the villa.
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onNext)}
          className="px-6 py-6 grid gap-5"
        >
          {/* First / Last name */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <LabelInner icon={<IconUser />} text="First Name" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Savannah" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <LabelInner icon={<IconUser />} text="Last Name" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email / Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <LabelInner icon={<IconMail />} text="Email Address" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <LabelInner icon={<IconPhone />} text="Phone Number" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (318) 555-0116" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address / City */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <LabelInner icon={<IconMapPin />} text="Address" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <LabelInner icon={<IconMapPin />} text="City" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Paris" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Postcode / Country */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <LabelInner text="Postcode" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="2495" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <LabelInner text="Country of Residence" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="France" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Arrival time */}
          <FormField
            control={form.control}
            name="arrivalTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <LabelInner
                    icon={<IconClock />}
                    text="Estimated Arrival Time"
                  />
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 3:00 PM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Comment */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <LabelInner text="Special Requests / Comments" />
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="Any notes for the host..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CTA */}
          <Button
            type="submit"
            className="w-full rounded-xl py-3.5 text-text-[12px] font-semibold text-white shadow-sm transition-all cursor-pointer duration-200 hover:opacity-90 hover:shadow-md active:scale-95"
            style={{ backgroundColor: "#24a9e1" }}
          >
            Continue to Payment →
          </Button>
        </form>
      </Form>
    </div>
  );
}
