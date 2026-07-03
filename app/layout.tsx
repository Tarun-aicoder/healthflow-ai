import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HealthFlow AI",
  description: "Hospital Operations Copilot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body suppressHydrationWarning>
    {children}
  </body>
</html>
  );
}