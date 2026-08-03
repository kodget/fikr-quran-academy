import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Fikr Quran Academy - Building Strong Muslims Through Structured Qur'an Education",
  description:
    "World-class personalised 1-on-1 Qur'an education for children and adults — from Nigeria to the world. Join our online Islamic education academy.",
  keywords: [
    "Quran Academy",
    "Islamic Education",
    "Online Quran Learning",
    "Tajweed",
    "Hifz Programme",
    "1-on-1 Quran Classes",
  ],
  authors: [{ name: "Fikr Quran Academy" }],
  openGraph: {
    title: "Fikr Quran Academy - Online Islamic Education",
    description:
      "World-class personalised 1-on-1 Qur'an education for children and adults worldwide",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fikr Quran Academy - Online Islamic Education",
    description:
      "World-class personalised 1-on-1 Qur'an education for children and adults worldwide",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body
        className={inter.className}
        style={{ fontFamily: "Outfit, system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
