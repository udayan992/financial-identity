import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CredEnce — Verifiable Financial Identity for Informal & Thin-File Earners",
  description:
    "A portable, AI-powered reputation passport that informal and thin-file earners own and can use anywhere. Build trust with explainable scoring and consent-based sharing.",
  icons: {
    icon: "/favicon.svg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppProvider>
          <TooltipProvider>
            <Navbar />
            <main>{children}</main>
          </TooltipProvider>
        </AppProvider>
      </body>
    </html>
  );
}
