"use client";

import Image from "next/image";
import { useState } from "react";
import { ContactForm, ContactFormValues } from "./contact-form";

// Social icons as inline SVGs to avoid external dependencies
const FacebookIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="14" cy="14" r="14" fill="#1877F2" />
    <path
      d="M17.5 9H15.75C15.0596 9 14.5 9.55964 14.5 10.25V12H17.5L17 15H14.5V22H11.5V15H9.5V12H11.5V10.25C11.5 8.17893 13.1789 6.5 15.25 6.5H17.5V9Z"
      fill="white"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="ig-gradient" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <circle cx="14" cy="14" r="14" fill="url(#ig-gradient)" />
    <rect
      x="8"
      y="8"
      width="12"
      height="12"
      rx="3.5"
      stroke="white"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="14"
      cy="14"
      r="3"
      stroke="white"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="18" cy="10" r="0.8" fill="white" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.62 7.79C5.06 10.62 7.38 12.93 10.21 14.38L12.41 12.18C12.68 11.91 13.08 11.82 13.43 11.94C14.55 12.31 15.76 12.51 17 12.51C17.55 12.51 18 12.96 18 13.51V17C18 17.55 17.55 18 17 18C7.61 18 0 10.39 0 1C0 0.45 0.45 0 1 0H4.5C5.05 0 5.5 0.45 5.5 1C5.5 2.25 5.7 3.45 6.07 4.57C6.18 4.92 6.1 5.31 5.82 5.59L3.62 7.79Z"
      fill="#00BCD4"
    />
  </svg>
);

// Decorative wave SVG for the title
const WaveDecoration = () => (
  <Image src="/logo-shape.png" width={100} height={70} alt="Logo shape" />
);

interface ContactFormContainerProps {
  imageSrc?: string;
  imageAlt?: string;
  phone?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  onSubmitSuccess?: (values: ContactFormValues) => void;
}

export function ContactFormContainer({
  imageSrc = "/resort-image.jpg",
  imageAlt = "Resort exterior at dusk",
  phone = "+66 (0)62 408 0324",
  facebookUrl = "#",
  instagramUrl = "#",
  onSubmitSuccess,
}: ContactFormContainerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call — replace with your actual submission logic
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitStatus("success");
      onSubmitSuccess?.(values);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* ── Left: Resort Image ── */}
          <div className="flex-1 min-h-70 md:min-h-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              height={280}
              width={420}
              className="w-full h-full object-cover"
              style={{ minHeight: "280px", maxHeight: "420px" }}
            />
          </div>

          {/* ── Right: Contact Panel ── */}
          <div className="flex-1 flex flex-col justify-start pt-1">
            {/* Heading */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-1">
                Get in touch
              </h2>
              <div className="flex items-center gap-x-2">
                <WaveDecoration />
                <p className="mt-2 text-sm font-semibold text-cyan-500">
                  For general enquiries &amp; further information
                </p>
              </div>
            </div>

            {/* Social + Phone */}
            <div className="flex items-center gap-3 mb-5">
              <a
                href={facebookUrl}
                target="_blank"
                aria-label="Facebook"
                className="transition-opacity hover:opacity-80"
              >
                <FacebookIcon />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-80"
              >
                <InstagramIcon />
              </a>
              <div className="flex items-center gap-2 ml-1">
                <PhoneIcon />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-sm font-medium text-gray-700 hover:text-cyan-500 transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>

            {/* Success / Error feedback */}
            {submitStatus === "success" && (
              <div className="mb-4 px-3 py-2 bg-green-50 border border-green-200 text-green-700 text-sm">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 text-red-700 text-sm">
                Something went wrong. Please try again.
              </div>
            )}

            {/* Form */}
            <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>
    </section>
  );
}
