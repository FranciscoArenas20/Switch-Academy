import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";
import AdminBar from "@/components/ui/AdminBar";

// Display font — bold, editorial, modern
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Body font — clean, readable, slightly geometric
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex — Language Courses",
  description:
    "Learn English and French with expert-led personalized courses. Start your journey today.",
  openGraph: {
    title: "Alex — Language Courses",
    description: "Expert-led English & French courses. Book a free trial class.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        <AdminBar />
      </body>
    </html>
  );
}
