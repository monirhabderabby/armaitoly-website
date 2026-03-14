"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, FileText, XCircle } from "lucide-react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Policy {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string; // HTML string, same as faq.answer
}

// ─── Static policy data ───────────────────────────────────────────────────────
// Replace these HTML strings with your real content / API response.

const POLICIES: Policy[] = [
  {
    id: "terms",
    title: "General Terms and Conditions",
    icon: <FileText className="w-4 h-4 text-sky-500" />,
    content: `
      <p>Please read these Terms and Conditions carefully as these conditions incorporate the basis on which bookings for the Joy Beach Villa are accepted.</p>
      <p>We may revise these Terms and Conditions from time to time by updating this posting. The revised terms will take effect when they are posted.</p>

      <h4>Early Check-Out</h4>
      <p>The property reserves the right to charge an early departure fee in the event a guest departs earlier than the original departure date.</p>

      <h4>Deposit &amp; Payment Policy</h4>
      <p>A deposit of 30% of the booking value is required to confirm your booking. Remaining payment is required 30 days before arrival.</p>
      <p>For reservations with arrival dates less than 30 days away, full payment is required to confirm your booking.</p>

      <h4>Damage Deposit</h4>
      <p>Upon check-in, Joy Beach Villa requires a deposit of 20% of your booking value in cash (within a minimum of 5,000 THB) or a passport. At check out date, after the villa is inspected and found to be damage-free, the deposit will be refunded.</p>

      <h4>Governing Law &amp; Jurisdiction</h4>
      <p>This site is operated from Thailand and it is governed by the laws of Thailand.</p>
    `,
  },
  {
    id: "cancellation",
    title: "Cancellation Policy",
    icon: <XCircle className="w-4 h-4 text-sky-500" />,
    content: `
      <p>Each rate booked at Joy Beach Villas is subject to our Cancellation Policy as detailed below:</p>
      <ol>
        <li>If a booking is cancelled up to 31 days before the arrival date, the upfront payment will not be refunded.</li>
        <li>Booking cancellation less than 31 days prior to arrival date, no refund will be issued.</li>
        <li>No show, no refund will be issued.</li>
        <li>In case of a change in arrival date to a further date, no refund will be issued.</li>
        <li>In case of early check-out, no refund will be issued.</li>
      </ol>

      <h4>Relocation</h4>
      <p>In the rare unexpected event whereby the property cannot provide accommodation as previously booked, Joy Beach Villas will comply with the industry guideline of undertaking to relocate guests into an alternative property of equal or better grading at no additional cost. We will endeavour to find the best equal or better grading in the vicinity of the original booking.</p>

      <h4>Limitation of Liability</h4>
      <p>Notwithstanding anything contained in these Terms and Conditions to the contrary, The Joy Beach Villas shall not be responsible for loss or damage arising from consequential damage or special circumstances, including but not limited to loss of revenue, loss of profit, loss of use, loss of opportunity, arising out of the performance or non-performance of obligations under these Terms and Conditions.</p>

      <h4>Insurance</h4>
      <p>The Joy Beach Villas strongly recommends you purchase Comprehensive Travel Insurance. We suggest that the policy includes, but not be limited to, the following coverage – loss of payment through cancellation, loss or damage to personal baggage, loss of money and medical expenses.</p>
    `,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const PolicyContainer = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-250 mx-auto mt-5">
      {/* Policy accordion list */}
      <motion.div
        className="divide-y divide-gray-100"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.055 } },
        }}
      >
        {POLICIES.map((policy) => {
          const isOpen = openId === policy.id;

          return (
            <motion.div
              key={policy.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.25, ease: "easeOut" },
                },
              }}
              layout
            >
              {/* Trigger row */}
              <button
                onClick={() => setOpenId(isOpen ? null : policy.id)}
                className="w-full flex items-center justify-between gap-4 py-3 text-left group"
              >
                <span className="flex items-center gap-2.5">
                  {/* Icon badge — mirrors the blue square icon in your screenshot */}
                  <span className="flex items-center justify-center w-7 h-7 rounded-md bg-sky-50 border border-sky-100 shrink-0">
                    {policy.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors leading-snug">
                    {policy.title}
                  </span>
                </span>

                {/* Animated chevron — exact same pattern as FaqContainer */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </motion.div>
              </button>

              {/* Expanding answer panel — height 0 → auto, identical to FAQ */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="prose prose-sm max-w-none text-gray-500 my-3
                        prose-h4:text-gray-700 prose-h4:font-semibold prose-h4:mt-4 prose-h4:mb-1
                        prose-ul:list-disc prose-ul:pl-5
                        prose-ol:list-decimal prose-ol:pl-5
                        prose-li:my-0.5
                        [&_ul]:list-disc [&_ul]:pl-5
                        [&_ol]:list-decimal [&_ol]:pl-5
                        [&_li]:my-2
                        [&_h4]:text-gray-700 [&_h4]:font-semibold [&_h4]:mt-4 [&_h4]:mb-1 [&_h4]:text-sm"
                      dangerouslySetInnerHTML={{ __html: policy.content }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.3 }}
        className="mt-5 text-xs text-gray-400"
      >
        {POLICIES.length} policies
      </motion.p>
    </div>
  );
};

export default PolicyContainer;
