import { baseUrl } from "@/constants";
import { useMutation } from "@tanstack/react-query";

interface CreatePaymentPayload {
  bookId: string;
  amount: number;
  description: string;
  currency: string;
  status: "completed" | "pending" | "failed";
  paymentIntentId: string;
}

interface CreatePaymentData {
  bookId: string;
  invoiceId: string;
  description: string;
  amount: number;
  currency: string;
  status: string;
  success: boolean;
  message: string;
}

export interface CreatePaymentResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: CreatePaymentData;
}

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: async (payload: CreatePaymentPayload) => {
      const res = await fetch(`${baseUrl}/booking/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to record payment");
      return res.json() as Promise<CreatePaymentResponse>;
    },
  });
};
