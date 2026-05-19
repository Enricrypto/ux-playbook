import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-logo",
});

export const metadata: Metadata = {
  title: "UX Psychology Playbook",
  description: "Psychology-driven design patterns for SaaS, Mobile & E-commerce",
  icons: { icon: "/logo-mark.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} ${nunito.variable}`}>
      <body className="antialiased" style={{ backgroundColor: "#F5F0EB" }}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
