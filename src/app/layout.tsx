import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";

import { AppProvider } from "@/providers/app-provider";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pasti Lolos Admin",
  description: "Administrative console for Pasti Lolos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
