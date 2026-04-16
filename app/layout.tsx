import ChatBot from "@/components/shared/chatbot/chatbot";
import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { baseUrl } from "@/constants";
import AppProvider from "@/providers/app-provider";
import TranslateProvider from "@/providers/translate-provider";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
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
  // ✅ Google Search Console verification moved here (cleaner)
  verification: {
    google: [
      "b1QX-jMl_BSBjxWl7ZRQZXzn8rPK46UccxS2A7f8dHc",
      "6eKAUJntM4Ew9se0xcgFzvyUEISRIILjIDf2czxtaew",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1120824566600450');
fbq('track', 'PageView');`,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} font-(family-name:--font-poppins) antialiased`}
        suppressHydrationWarning
      >
        {/* ✅ Meta Pixel noscript fallback — eslint-disable needed because
            this is a tracking pixel, NOT a real image. next/image won't work here. */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1120824566600450&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <AppProvider>
          <Navbar />
          {children}
          <Footer />
        </AppProvider>

        {/* Google Translate container */}
        <div id="google_translate_element"></div>

        {/* Loaded only on client */}
        <Suspense fallback={null}>
          <LangConfig />
        </Suspense>
        <Suspense fallback={null}>
          <TranslateProvider />
        </Suspense>

        {/* Google Translate script */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />

        <ChatBot
          apiEndpoint={`${baseUrl}/ai/ask-your-question`}
          botName="Joy Beach AI Assistant"
        />

        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />

        <Script
          src="https://embeds.iubenda.com/widgets/cbac44de-7799-4c30-98fa-0ef5473b11f5.js"
          strategy="afterInteractive"
          async
        />

        <GoogleTagManager gtmId="GTM-TBWB64FT" />
      </body>
    </html>
  );
}
