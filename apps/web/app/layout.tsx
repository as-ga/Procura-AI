import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Procura AI",
  description: "AI Procurement Agent for Smart Business Purchases",
  // description: "AI-powered procurement agent that discovers, compares and purchases products using Prava.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
