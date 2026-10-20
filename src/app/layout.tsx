import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/layout/SearchModal";
import { AppProviders } from "@/components/providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AETHER | Autonomous Hyper-Logistics & Quantum Delivery",
  description:
    "The next-generation urban logistics infrastructure. Dedicated high-velocity transit corridors, white-glove security, micro-precision telemetry, and zero-delay dispatching.",
  keywords: [
    "hyper delivery",
    "luxury courier",
    "autonomous logistics",
    "on-demand dispatch",
    "same-hour delivery",
    "AETHER",
  ],
  authors: [{ name: "AETHER Technologies" }],
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#09090B] text-zinc-100 min-h-screen flex flex-col`}
      >
        <AppProviders>
          <Navbar />
          <SearchModal />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
