import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Masthead } from "@/components/Masthead";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { FIRM } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  axes: ["opsz"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <GrainOverlay />
        <Masthead />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
