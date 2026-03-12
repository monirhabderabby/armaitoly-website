import Navbar from "@/components/shared/navbar/navbar";
import AppProvider from "@/providers/app-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

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
      </body>
    </html>
  );
}
