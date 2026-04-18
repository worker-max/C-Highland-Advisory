import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { FIRM } from "@/lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(FIRM.siteUrl),
  title: {
    default: `${FIRM.name} — ${FIRM.discipline}`,
    template: `%s — ${FIRM.name}`,
  },
  description:
    "Advisory firm partnering with leaders across healthcare, government, hospitality, and the industries that run them. One firm. Six disciplines. Charleston, SC.",
  openGraph: {
    title: `${FIRM.name} — ${FIRM.discipline}`,
    description:
      "One firm. Six disciplines. Charleston, SC. Strategy, operations & applied AI.",
    url: FIRM.siteUrl,
    siteName: FIRM.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: FIRM.name,
    description: FIRM.discipline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <GrainOverlay />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
