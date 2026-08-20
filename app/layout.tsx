import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhurba Dhakal | Full Stack Developer | Laravel & PHP Developer",
  description:
    "Portfolio of Dhurba Dhakal, Full Stack Developer with 2+ years of experience specializing in Laravel, PHP, MySQL, REST APIs, dynamic CMS platforms, and modern web applications with React, Next.js, Node.js, and PostgreSQL.",
  keywords: [
    "Dhurba Dhakal",
    "Full Stack Developer",
    "Laravel Developer",
    "PHP Developer",
    "Laravel Developer Nepal",
    "PHP Web Developer Nepal",
    "Full Stack Developer Nepal",
    "Laravel Web Development",
    "PHP Development",
    "React Developer",
    "Node.js Developer",
    "Next.js Developer",
    "Web Application Developer",
    "Software Developer",
    "CMS Developer",
    "Business Application Developer",
    "Nepal",
  ],
  authors: [{ name: "Dhurba Dhakal" }],
  openGraph: {
    title: "Dhurba Dhakal | Full Stack Developer | Laravel & PHP Developer",
    description:
      "Building practical, scalable, and business-focused web applications with Laravel, PHP, and modern full-stack technologies.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1D4ED8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-700">
        {children}
      </body>
    </html>
  );
}
