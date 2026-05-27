import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Vaidy AI — Your AI Health Copilot, Built for India",
  description:
    "Upload blood reports from Apollo, Thyrocare, or Lal Path Labs. Detect trends, understand biomarkers, and get plain-language explanations in Hindi or English.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Single dramatic light source from top center */}
        <div className="page-light" aria-hidden="true" />
        {/* Vignette to deepen the corners */}
        <div className="vignette" aria-hidden="true" />

        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
