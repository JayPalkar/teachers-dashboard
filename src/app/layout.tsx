import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teacher Dashboard",
  description: "Modern teacher management interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
