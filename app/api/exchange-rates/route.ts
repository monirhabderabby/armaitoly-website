import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = (searchParams.get("base") ?? "USD").toLowerCase();

  const PRIMARY = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`;
  const FALLBACK = `https://latest.currency-api.pages.dev/v1/currencies/${base}.json`;

  try {
    let res = await fetch(PRIMARY, { next: { revalidate: 3600 } });

    // Fallback if primary CDN fails
    if (!res.ok) {
      res = await fetch(FALLBACK, { next: { revalidate: 3600 } });
    }

    if (!res.ok) throw new Error("Failed to fetch rates");

    const data = await res.json();

    // Response shape: { date: "2026-04-05", bdt: { usd: 0.0083, eur: ... } }
    const rates = data[base];

    if (!rates) {
      return NextResponse.json(
        { error: `Unsupported base currency: ${base.toUpperCase()}` },
        { status: 400 },
      );
    }

    // Normalize keys to uppercase and inject base=1
    const normalized = Object.fromEntries(
      Object.entries(rates).map(([k, v]) => [k.toUpperCase(), v]),
    );
    normalized[base.toUpperCase()] = 1;

    return NextResponse.json(normalized);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch exchange rates" },
      { status: 500 },
    );
  }
}
