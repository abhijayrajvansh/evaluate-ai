import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MobileViewWarning from "@/components/parts/MobileViewWarning";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Evaluate AI",
  description: "developed by abhijay rajvansh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="wrapper">
          {children}
        </div>
        <MobileViewWarning />
      </body>
    </html>
  );
}
