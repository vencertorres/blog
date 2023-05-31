import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog",
  description: "Blog app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        {/* @ts-expect-error Async Server Component */}
        <Navigation />
        {children}
      </body>
    </html>
  );
}
