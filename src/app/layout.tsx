import type { Metadata } from "next";

import "./globals.scss";
import ReactRouterProvider from "@/providers/reactRouter.provider";
import { AuthProvider } from "@/providers/auth.provider";

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
      <body>
        <ReactRouterProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactRouterProvider>
      </body>
    </html>
  );
}
