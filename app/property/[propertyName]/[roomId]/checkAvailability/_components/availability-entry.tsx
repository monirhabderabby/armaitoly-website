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
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "sonner";
import { OnBookingSubmitProps } from "./availability-calendar";
import AvailabilityContainer from "./availability-container";
import { GuestData } from "./payment-form/Guestinfoform";
import PaymentFormContainer from "./payment-form/Paymentformcontainer";
const DepositConfirmation = dynamic(() => import("./deposit-confirmation"), {
  ssr: false,
});

interface Props {
  propId: string;
  roomId: string;
  fetchStartDate: string;
  fetchEndDate: string;
  startDate?: string;
  endDate?: string;
}

/** Shape of the pending payment payload while the modal is open */
interface PendingPayment {
  data: { guest: GuestData; card: null; voucher: string };
  resolve: (result: PaymentIntentData | false) => void;
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

  /** Non-null while the deposit modal is open */
  const [pendingPayment, setPendingPayment] = useState<PendingPayment | null>(
    null,
  );

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

  // ── Step 1: show the modal; actual work happens after confirmation ──────
  const onPayment = (data: {
    guest: GuestData;
    card: null;
    voucher: string;
  }): Promise<PaymentIntentData | false> => {
    return new Promise<PaymentIntentData | false>((resolve) => {
      setPendingPayment({ data, resolve });
    });
  };

  // ── Confirmed from modal → run booking + payment intent ─────────────────
  const handleDepositConfirm = async () => {
    if (!pendingPayment) return;
    const { data, resolve } = pendingPayment;
    setPendingPayment(null); // close modal immediately

    if (!timeSlotsData) {
      toast.error("Check-in and check-out data missing!");
      resolve(false);
      return;
    }

    const guest = data.guest;

    // Step 1: Create booking
    const bookingResult = await new Promise<CreateBookingResponse | false>(
      (res) => {
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
              res(false);
            },
            onSuccess: (r: CreateBookingResponse) => {
              if (!r.success) {
                toast.error(r.message ?? "Booking creation failed");
                res(false);
                return;
              }
              res(r);
            },
          },
        );
      },
    );

    if (!bookingResult) {
      resolve(false);
      return;
    }

    // Step 2: Create payment intent
    try {
      const bookId = String(bookingResult.data.bookId);
      const currency = roomData?.data?.price?.currency ?? "THB";
      const converted =
        getConvertedAmount(timeSlotsData.totalAmount, currency) ??
        timeSlotsData.totalAmount;
      const checkInDate = new Date(timeSlotsData.checkIn);
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

      const depositAmount =
        checkInDate <= oneMonthFromNow
          ? Math.round(converted) // full amount
          : Math.round(converted * 0.3); // 30% deposit

      const intentResult = await createPaymentIntent({
        bookId,
        amount: depositAmount,
        deposit:
          checkInDate <= oneMonthFromNow ? "Deposit Full" : "Deposit 30%",
        status: "Payment",
        currency: selectedCurrency,
      });

      if (!intentResult.success) {
        toast.error(intentResult.message ?? "Failed to initialise payment");
        resolve(false);
        return;
      }

      resolve(intentResult.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message ?? "Payment initialisation failed");
      resolve(false);
    }
  };

  // ── Dismissed from modal ────────────────────────────────────────────────
  const handleDepositClose = () => {
    if (!pendingPayment) return;
    pendingPayment.resolve(false);
    setPendingPayment(null);
  };

  const paymentIsOngoing = isBookingPending || isIntentPending;

  // ── Derived deposit figures for the modal display ───────────────────────
  const currency = roomData?.data?.price?.currency ?? "THB";
  const convertedTotal = timeSlotsData
    ? (getConvertedAmount(timeSlotsData.totalAmount, currency) ??
      timeSlotsData.totalAmount)
    : 0;

  const isWithinOneMonth = timeSlotsData
    ? new Date(timeSlotsData.checkIn) <=
      new Date(new Date().setMonth(new Date().getMonth() + 1))
    : false;

  const depositAmt = isWithinOneMonth
    ? Math.round(convertedTotal) // 100% — full amount
    : Math.round(convertedTotal * 0.3); // 30% — deposit

  const remainingAmt = isWithinOneMonth ? 0 : Math.round(convertedTotal * 0.7);

  // ── Main render ─────────────────────────────────────────────────────────
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
              startDate={fetchStartDate}
              endDate={fetchEndDate}
              defaultCheckIn={startDate}
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
                  total: convertedTotal,
                  currency,
                  image,
                }}
                loading={paymentIsOngoing}
              />
            )}
          </ResizablePanel.Content>
        </ResizablePanel.Root>

        {/* ── Deposit confirmation modal (portal-like, mounts when modal is open) ── */}
        {pendingPayment && timeSlotsData && (
          <DepositConfirmation
            villaName={roomName}
            checkIn={timeSlotsData.checkIn}
            checkOut={timeSlotsData.checkOut}
            guests={timeSlotsData.guests}
            currency={selectedCurrency}
            totalAmount={convertedTotal.toLocaleString()}
            depositAmount={depositAmt.toLocaleString()}
            remainingAmount={remainingAmt.toLocaleString()}
            onConfirm={handleDepositConfirm}
            onClose={handleDepositClose}
            depositLabel={
              isWithinOneMonth
                ? "Full amount (check-in within 30 days)"
                : "30% of total"
            }
          />
        )}
      </div>
    );
  }

  return content;
}
