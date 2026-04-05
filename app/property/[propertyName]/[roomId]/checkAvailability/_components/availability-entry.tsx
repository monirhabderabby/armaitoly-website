"use client";

import * as ResizablePanel from "@/components/ui/resizable-panel";
import { useCreateBooking } from "@/hooks/booking/use-booking-create";
import {
  PaymentIntentData,
  useCreatePaymentIntent,
} from "@/hooks/booking/use-create-payment-intent";
import { useGetSingleProperty } from "@/hooks/property/use-get-single-property";
import { useCurrencyFormat } from "@/hooks/use-currency-format";
import { CreateBookingResponse } from "@/types/booking";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { OnBookingSubmitProps } from "./availability-calendar";
import AvailabilityContainer from "./availability-container";
import { GuestData } from "./payment-form/Guestinfoform";
import PaymentFormContainer from "./payment-form/Paymentformcontainer";

interface Props {
  propId: string;
  roomId: string;
  fetchStartDate: string; // always has a value — used for the API call
  fetchEndDate: string; // always has a value — used for the API call
  startDate?: string; // only set when the URL contained it — pre-selects calendar
  endDate?: string;
}

export default function AvailabilityEntry({
  propId,
  roomId,
  fetchStartDate,
  fetchEndDate,
  startDate,
  endDate,
}: Props) {
  const [state, setState] = useState<"timeSlots" | "payment">("timeSlots");
  const [timeSlotsData, setTimeSlotData] =
    useState<OnBookingSubmitProps | null>(null);
  const { selectedCurrency, getConvertedAmount } = useCurrencyFormat();

  const { isPending: isBookingPending, mutateAsync: createBooking } =
    useCreateBooking();
  const {
    data: roomData,
    isLoading,
    isError,
    error,
  } = useGetSingleProperty(roomId);
  const { mutateAsync: createPaymentIntent, isPending: isIntentPending } =
    useCreatePaymentIntent();

  const handleNext = (values: OnBookingSubmitProps) => {
    setTimeSlotData(values);

    setState("payment");
  };

  // convert(
  //         values.totalAmount,
  //         data?.data.price.currency!,
  //         selectedCurrency,
  //       ) ?? values.totalAmount,

  const onPayment = async (data: {
    guest: GuestData;
    card: null;
    voucher: string;
  }): Promise<PaymentIntentData | false> => {
    if (!timeSlotsData) {
      toast.error("Check-in and check-out data missing!");
      return false;
    }

    const guest = data.guest;

    // ── Step 1: Create booking ─────────────────────────────────────────────
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

    if (!bookingResult) return false;

    // ── Step 2: Create payment intent ──────────────────────────────────────
    try {
      const bookId = String(bookingResult.data.bookId);
      // const depositAmount = Math.round(timeSlotsData.totalAmount * 0.3);

      const convertedTotalAmount =
        getConvertedAmount(
          timeSlotsData.totalAmount,
          roomData?.data?.price?.currency ?? "THB",
        ) ?? timeSlotsData.totalAmount;

      const depositAmount = Math.round(convertedTotalAmount * 0.3);

      const intentResult = await createPaymentIntent({
        bookId,
        amount: depositAmount,
        deposit: "Deposit 30%",
        status: "Payment",
        currency: selectedCurrency,
      });

      if (!intentResult.success) {
        toast.error(intentResult.message ?? "Failed to initialise payment");
        return false;
      }

      // Return full PaymentIntentData — publishableKey is inside
      return intentResult.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message ?? "Payment initialisation failed");
      return false;
    }
  };

  const paymentIsOngoing = isBookingPending || isIntentPending;

  let content;

  if (isLoading) {
    content = (
      <div className="min-h-[50vh] flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else if (roomData && roomData.data) {
    const roomName = roomData.data.name;
    const currency = roomData.data.price.currency;
    const image =
      roomData.data.images?.length > 0 ? roomData.data.images[0].url : "";
    const location = roomData.data.location;

    content = (
      <div>
        <ResizablePanel.Root value={state}>
          <ResizablePanel.Content value="timeSlots">
            <AvailabilityContainer
              propId={propId}
              roomId={roomId}
              startDate={fetchStartDate} // ← API fetch range
              endDate={fetchEndDate}
              defaultCheckIn={startDate} // ← calendar pre-selection (undefined when absent)
              defaultCheckOut={endDate}
              onNext={handleNext}
              room={roomData.data}
            />
          </ResizablePanel.Content>
          <ResizablePanel.Content value="payment">
            {timeSlotsData && (
              <PaymentFormContainer
                onSubmit={onPayment}
                villa={{
                  checkIn: timeSlotsData.checkIn,
                  checkOut: timeSlotsData.checkOut,
                  cleaningFee: 0,
                  guests: timeSlotsData.guests,
                  location,
                  name: roomName,
                  total:
                    getConvertedAmount(timeSlotsData.totalAmount, currency) ??
                    timeSlotsData.totalAmount,
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
