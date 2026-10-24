import type { Metadata, Viewport } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/layout/SearchModal";
import { AppProviders } from "@/components/providers/AppProviders";

const sans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const display = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export const metadata: Metadata = {
  title: "AETHER | Доставка по Ташкенту",
  description:
    "Городская доставка документов, еды, техники и посылок. Прозрачные цены, живые курьеры, отслеживание заказа.",
};

export const viewport: Viewport = {
  themeColor: "#161411",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('aether-theme');
                if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${display.variable} antialiased bg-[#161411] text-zinc-100 min-h-screen flex flex-col`}
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
