import { baseUrl } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  try {
    const { bookId, amount, currency, paymentIntentId, description } =
      await req.json();

    if (!bookId || !paymentIntentId) {
      return NextResponse.json(
        { success: false, message: "bookId and paymentIntentId are required" },
        { status: 400 },
      );
    }

    // A — Verify payment actually succeeded with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { success: false, message: "Payment has not succeeded" },
        { status: 400 },
      );
    }

    // B — Record payment in Beds24
    const beds24Res = await fetch(
      `${baseUrl}/booking/payment`, // 👈 confirm this endpoint with Beds24 docs
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 👈 add this, otherwise body won't parse
        },

        body: JSON.stringify({
          bookId,
          amount,
          currency,
          description: description ?? "Deposit payment",
          status: "Payment",
          paymentIntentId: paymentIntentId,
        }),
      },
    );

    const beds24Data = await beds24Res.json();

    if (!beds24Res.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to record payment in Beds24" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: beds24Data,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
