import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Joy Beach Villas",
  description:
    "please read these terms and conditions carefully as these conditions incorporate the basis on which bookings for joy beach villa are accepted.",
};

const Page = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Big Title Hero */}
      <section className="border-b border-gray-200 px-4 py-20 sm:py-16 md:py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            General Terms
            <br className="hidden sm:block" /> and Conditions
          </h1>
          <p className="mt-4 text-sm text-gray-400 tracking-wide uppercase">
            Last updated · 2025
          </p>
        </div>
      </section>

      {/* Body Content */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-12 gap-y-10">
          {/* Intro — full width */}
          <div className="md:col-span-2 border-b border-gray-100 pb-8 space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              Please read these Terms and Conditions carefully as these
              conditions incorporate the basis on which bookings for Joy Beach
              Villa are accepted.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Joy Beach Villas shall be entitled to vary, amend and/or change
              these terms and conditions at any time without prior notice.
            </p>
          </div>

          {/* Deposit & Payment */}
          <div className="md:py-0.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              01
            </span>
            <h2 className="mt-1 text-sm font-semibold text-gray-900">
              Deposit &amp; Payment Policy
            </h2>
          </div>
          <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <p>
              A deposit of 30% of the booking value is required to confirm your
              booking.
            </p>
            <p>Remaining payment is required 30 days before arrival.</p>
            <p>
              For reservations with arrival dates less than 30 days away, full
              payment is required to confirm your booking.
            </p>
          </div>

          {/* Divider */}
          <div className="md:col-span-2 border-t border-gray-100" />

          {/* Cancellation Policy */}
          <div className="md:pt-0.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              02
            </span>
            <h2 className="mt-1 text-sm font-semibold text-gray-900">
              Cancellation Policy
            </h2>
          </div>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              Each rate booked at Joy Beach Villas is subject to our
              Cancellation Policy as detailed below:
            </p>
            <ol className="space-y-2 list-decimal list-inside marker:text-gray-400">
              <li>
                If a booking is cancelled up to 31 days before the arrival date,
                the upfront payment will not be refunded.
              </li>
              <li>
                If a booking is cancelled 14 to 30 days before the arrival date,
                50% of the total booking value will be charged.
              </li>
              <li>
                If a booking is cancelled less than 14 days before the arrival
                date, 100% of the total booking value will be charged.
              </li>
              <li>No show, no refund will be issued.</li>
              <li>
                In case of a change in arrival date to a further date, no refund
                will be issued.
              </li>
              <li>In case of early check-out, no refund will be issued.</li>
            </ol>
            <p>
              We reserve the right to cancel or modify reservations under the
              circumstances where it appears that a customer has provided an
              invalid credit card, engaged in fraudulent or inappropriate
              activity. In addition, we also reserve the right to cancel or
              amend bookings if they do not adhere to our Terms and Conditions.
            </p>
            <p>
              As a condition of using Joy Beach Villas booking method, you agree
              to provide proof of payment to Joy Beach Villas within 48 hours of
              the time of booking and will indicate the reservation confirmation
              number on the proof of payment. You will be fully responsible for
              any banking fees and/or costs required to complete the bank fund
              transaction(s). Furthermore, you acknowledge that the reservation
              may be cancelled by Joy Beach Villas if proof of payment is not
              submitted within the 48-hour notice period.
            </p>
          </div>

          {/* Divider */}
          <div className="md:col-span-2 border-t border-gray-100" />

          {/* Damage Deposit */}
          <div className="md:pt-0.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              03
            </span>
            <h2 className="mt-1 text-sm font-semibold text-gray-900">
              Damage Deposit
            </h2>
          </div>
          <div className="text-sm text-gray-600 leading-relaxed">
            <p>
              Upon checking in, Joy Beach Villas requires a deposit of 20% of
              your booking value in cash (with a minimum of 5,000 THB) or a
              passport. At check out date, after the Villa is inspected and
              found to be damage-free, the deposit will be refunded.
            </p>
          </div>

          {/* Divider */}
          <div className="md:col-span-2 border-t border-gray-100" />

          {/* Insurance */}
          <div className="md:pt-0.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              04
            </span>
            <h2 className="mt-1 text-sm font-semibold text-gray-900">
              Insurance
            </h2>
          </div>
          <div className="text-sm text-gray-600 leading-relaxed">
            <p>
              The Joy Beach Villas strongly recommends you purchase
              Comprehensive Travel Insurance. We suggest that the policy
              include, but not be limited to, the following coverage – loss of
              payment through cancellation, loss or damage to personal baggage,
              loss of money and medical expenses.
            </p>
          </div>

          {/* Divider */}
          <div className="md:col-span-2 border-t border-gray-100" />

          {/* Governing Law */}
          <div className="md:pt-0.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              05
            </span>
            <h2 className="mt-1 text-sm font-semibold text-gray-900">
              Governing Law &amp; Jurisdiction
            </h2>
          </div>
          <div className="text-sm text-gray-600 leading-relaxed">
            <p>
              This site is operated from Thailand and it is governed by the laws
              of Thailand.
            </p>
          </div>

          {/* Bottom spacing */}
          <div className="md:col-span-2 pt-4" />
        </div>
      </div>
    </main>
  );
};

export default Page;
