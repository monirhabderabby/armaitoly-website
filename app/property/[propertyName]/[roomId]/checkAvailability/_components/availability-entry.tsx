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
import PaymentFormContainer, {
  CardData,
} from "./payment-form/Paymentformcontainer";

interface Props {
  propId: string;
  roomId: string;
  startDate: string;
  endDate: string;
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
    // const params = new URLSearchParams({
    //   checkIn: data,
    //   checkOut,
    //   nights: String(nights),
    //   propId,
    // });
    // router.push(`/booking/${roomId}?${params.toString()}`);
    setTimeSlotData(data);
    setState("payment");
  };

  const onPayment = async (data: {
    guest: GuestData;
    card: CardData;
    voucher: string;
  }): Promise<boolean> => {
    if (!timeSlotsData) {
      toast.error("check in and check out data missing!");
      return false; // 👈 also fix this — was returning undefined
    }

    const guest = data.guest;

    return new Promise<boolean>((resolve) => {
      // 👈 typed Promise
      createBooking(
        {
          roomId: roomId,
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
          onSuccess: (data: CreateBookingResponse) => {
            if (!data.success) {
              toast.error(data.message ?? "Booking creation failed");
              resolve(false);
              return;
            }

            // create payment now

            // after successful payment
            resolve(true);
          },
        },
      );
    });
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
                onSubmit={onPayment}
                villa={{
                  checkIn: timeSlotsData.checkIn,
                  checkOut: timeSlotsData.checkOut,
                  cleaningFee: 0,
                  guests: timeSlotsData.guests,
                  location: location,
                  name: roomName,
                  total: timeSlotsData.totalAmount,
                  currency: currency,
                  image: image,
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
