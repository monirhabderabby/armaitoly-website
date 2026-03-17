// components/availability/availability-entry.tsx
"use client";

import * as ResizablePanel from "@/components/ui/resizable-panel";
import { useCreateBooking } from "@/hooks/booking/use-booking-create";
import { useGetSingleProperty } from "@/hooks/property/use-get-single-property";
import { CreateBookingResponse } from "@/types/booking";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { OnBookingSubmitProps } from "./availability-calendar";
import AvailabilityContainer from "./availability-container";
import { GuestData } from "./payment-form/Guestinfoform";
import PaymentFormContainer from "./payment-form/Paymentformcontainer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Props {
  propId: string;
  roomId: string;
  startDate: string;
  endDate: string;
}

// This is what onPayment returns on success
export interface PaymentIntentResult {
  clientSecret: string;
  bookId: string;
  amount: number;
}

export default function AvailabilityEntry({
  propId,
  roomId,
  startDate,
  endDate,
}: Props) {
  const [state, setState] = useState<"timeSlots" | "payment">("timeSlots");
  const [timeSlotsData, setTimeSlotData] =
    useState<OnBookingSubmitProps | null>(null);

  const { isPending: isBookingPending, mutateAsync: createBooking } =
    useCreateBooking();

  const { data, isLoading, isError, error } = useGetSingleProperty(roomId);

  const handleNext = (data: OnBookingSubmitProps) => {
    setTimeSlotData(data);
    setState("payment");
  };

  // Returns PaymentIntentResult on success, false on failure
  const onPayment = async (data: {
    guest: GuestData;
    card: null;
    voucher: string;
  }): Promise<PaymentIntentResult | false> => {
    if (!timeSlotsData) {
      toast.error("Check-in and check-out data missing!");
      return false;
    }

    const guest = data.guest;

    // ── Step 1: Create booking in Beds24 ──────────────────────────────────
    const bookingResult = await new Promise<CreateBookingResponse | false>(
      (resolve) => {
        createBooking(
          {
            roomId,
            firstNight: timeSlotsData.checkIn,
            lastNight: timeSlotsData.checkOut,
            numAdult: timeSlotsData.guests,
            guestFirstName: guest.firstName,
            guestName: guest.lastName,
            guestEmail: guest.email,
            guestMobile: guest.phone,
            guestAddress: guest.address,
            guestCity: guest.city,
            guestCountry: guest.country,
            guestPostcode: guest.postcode,
            guestArrivalTime: guest.arrivalTime,
            guestComments: guest.comment,
            guestVoucher: data.voucher,
          },
          {
            onError: (error) => {
              toast.error(error.message ?? "Booking creation failed");
              resolve(false);
            },
            onSuccess: (res: CreateBookingResponse) => {
              if (!res.success) {
                toast.error(res.message ?? "Booking creation failed");
                resolve(false);
                return;
              }
              resolve(res);
            },
          },
        );
      },
    );

    // Stop if booking failed
    if (!bookingResult) return false;

    // ── Step 2: Create Stripe PaymentIntent (30% deposit) ─────────────────
    try {
      const bookId = String(bookingResult.data.bookId); // 👈 adjust to your actual response shape
      const depositAmount = Math.round(timeSlotsData.totalAmount * 0.3); // 30% deposit
      const currency = data.card ? "THB" : "THB"; // 👈 swap with real currency from room data if needed

      const intentRes = await fetch("/api/bookings/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          amount: depositAmount,
          currency,
        }),
      });

      const intent = await intentRes.json();

      if (!intent.success) {
        toast.error(intent.message ?? "Failed to initialise payment");
        return false;
      }

      // ── Return clientSecret + bookId + amount to PaymentFormContainer ───
      return {
        clientSecret: intent.data.clientSecret, // 👈 used by <Elements>
        bookId,
        amount: depositAmount,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message ?? "Payment initialisation failed");
      return false;
    }
  };

  const paymentIsOngoing = isBookingPending;

  let content;

  if (isLoading) {
    content = (
      <div className="min-h-[50vh] flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else if (data && data.data) {
    const roomName = data.data.name;
    const currency = data.data.price.currency;
    const image = data.data.images[0];
    const location = data.data.location;

    content = (
      <div>
        <ResizablePanel.Root value={state}>
          <ResizablePanel.Content value="timeSlots">
            <AvailabilityContainer
              propId={propId}
              roomId={roomId}
              startDate={startDate}
              endDate={endDate}
              onNext={handleNext}
              room={data.data}
            />
          </ResizablePanel.Content>
          <ResizablePanel.Content value="payment">
            {timeSlotsData && (
              <PaymentFormContainer
                onSubmit={onPayment} // 👈 now returns PaymentIntentResult | false
                villa={{
                  checkIn: timeSlotsData.checkIn,
                  checkOut: timeSlotsData.checkOut,
                  cleaningFee: 0,
                  guests: timeSlotsData.guests,
                  location,
                  name: roomName,
                  total: timeSlotsData.totalAmount,
                  currency,
                  image,
                }}
                loading={paymentIsOngoing}
              />
            )}
          </ResizablePanel.Content>
        </ResizablePanel.Root>
      </div>
    );
  }

  return content;
}
