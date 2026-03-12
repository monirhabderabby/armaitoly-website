import Navbar from "@/components/shared/navbar/navbar";
import AppProvider from "@/providers/app-provider";
import TranslateProvider from "@/providers/translate-provider";
import "flag-icons/css/flag-icons.min.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import LangConfig from "./lang-config";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JOY Beach Villas",
  description: "Celebrate The Good Life on Koh Phangan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-(family-name:--font-poppins) antialiased`}
        suppressHydrationWarning
      >
        <AppProvider>
          {" "}
          <Navbar />
          {children}
        </AppProvider>

        {/* ✅ Google translate container */}
        <div id="google_translate_element"></div>

        {/* ✅ Loaded only on client */}
        <Suspense fallback={null}>
          <LangConfig />
        </Suspense>
        <Suspense fallback={null}>
          <TranslateProvider />
        </Suspense>

        {/* ✅ Load google script after client ready */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
