import { baseUrl } from "@/constants";
import { useMutation } from "@tanstack/react-query";

interface CreateBookingPayload {
  roomId: string;
  firstNight: string;
  lastNight: string;
  numAdult: number;
  guestFirstName: string;
  guestName: string;
  guestEmail: string;
  guestMobile: string;

  guestAddress: string;
  guestCity: string;
  guestCountry?: string; // optional
  guestPostcode?: string; // optional

  guestArrivalTime?: string; // optional

  guestComments?: string; // optional
  guestVoucher?: string; // optional
}

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (payload: CreateBookingPayload) => {
      const res = await fetch(`${baseUrl}/booking/createe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create booking");

      return res.json();
    },
  });
};
