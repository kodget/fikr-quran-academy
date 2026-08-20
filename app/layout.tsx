import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fikr Quran Academy — Premium Qur'an Education, Worldwide",
  description:
    "Structured, personalised 1-on-1 Qur'an education for adults, students, and families — from foundational reading to complete memorisation. Accessible from anywhere in the world.",
  keywords: [
    "Quran Academy",
    "Islamic Education",
    "Online Quran Learning",
    "Tajweed",
    "Hifz Programme",
    "1-on-1 Quran Classes",
    "Quran for Adults",
    "Quran Memorisation",
    "Online Islamic Academy",
  ],
  authors: [{ name: "Fikr Quran Academy" }],
  openGraph: {
    title: "Fikr Quran Academy — Premium Qur'an Education, Worldwide",
    description:
      "Structured, personalised 1-on-1 Qur'an education for adults, students, and families worldwide.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fikr Quran Academy — Premium Qur'an Education, Worldwide",
    description:
      "Structured, personalised 1-on-1 Qur'an education for adults, students, and families worldwide.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Theme initialisation: runs before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var stored = localStorage.getItem('fikr-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
            `.trim(),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
