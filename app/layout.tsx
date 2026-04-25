import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Newsreader } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { FIRM } from "@/lib/constants";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

// Editorial serif — used in the wordmark + select pull-quote moments.
// Refined optical-size variable family; lands as Tiempos-adjacent without
// the theatrical italic of Fraunces.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  // axes:['opsz'] requires variable weight — Next.js constraint.
  // Dropping the weight array pulls the full variable family.
  axes: ["opsz"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}>
      <body>
        <GrainOverlay />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
