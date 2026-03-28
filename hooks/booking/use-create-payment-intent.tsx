import { baseUrl } from "@/constants";
import { useMutation } from "@tanstack/react-query";

interface CreatePaymentIntentPayload {
  bookId: string;
  amount: number;
  deposit: string;
  status: string;
}

export interface PaymentIntentData {
  bookId: string;
  amount: number;
  currency: string;
  sessionId: string;
  clientSecret: string;
  publishableKey: string;
  stripeAccount: string;
}

export interface CreatePaymentIntentResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: PaymentIntentData;
}

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: async (payload: CreatePaymentIntentPayload) => {
      const res = await fetch(`${baseUrl}/booking/payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create payment intent");
      return res.json() as Promise<CreatePaymentIntentResponse>;
    },
  });
};
