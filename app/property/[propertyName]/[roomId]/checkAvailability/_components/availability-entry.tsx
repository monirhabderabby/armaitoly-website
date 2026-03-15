// components/availability/availability-entry.tsx
"use client";

import * as ResizablePanel from "@/components/ui/resizable-panel";
import { useGetSingleProperty } from "@/hooks/property/use-get-single-property";
import { Loader2 } from "lucide-react";
import { useState } from "react";
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

  const onPayment = (data: {
    guest: GuestData;
    card: CardData;
    voucher: string;
  }) => {
    console.log(data);
  };

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
                loading={false}
              />
            )}
          </ResizablePanel.Content>
        </ResizablePanel.Root>
      </div>
    );
  }

  return content;
}
