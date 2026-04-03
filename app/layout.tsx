import ChatBot from "@/components/shared/chatbot/chatbot";
import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { baseUrl } from "@/constants";
import AppProvider from "@/providers/app-provider";
import TranslateProvider from "@/providers/translate-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  title: "Luxury Beach Villas in Koh Phangan | Joy Beach Villas",
  description:
    "experience the ultimate getaway at joy beach villas with luxury villas in koh phangan, offering stunning beach views and exquisite amenities for an unforgettable stay.",
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
          <Navbar />
          {children}
          <Footer />
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

        <ChatBot
          apiEndpoint={`${baseUrl}/ai/ask-your-question`}
          botName="Joy Beach AI Assistant"
        />

        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
      </body>
    </html>
  );
}
