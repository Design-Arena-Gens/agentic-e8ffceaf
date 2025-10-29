import "./globals.css";
import { type ReactNode } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "F STSC Department - Presentation",
  description: "Dynamic slide deck and downloadable PPT for the F STSC Department overview."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
