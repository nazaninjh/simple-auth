import type { Metadata } from "next";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Simple Authentication App Using NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body>{children}</body>
    </html>
  );
}
