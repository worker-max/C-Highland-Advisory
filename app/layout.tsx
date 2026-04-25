import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { FIRM } from "@/lib/constants";
import { ChromeRoot } from "@/components/chrome/ChromeRoot";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Editorial serif — Source Serif 4 with optical-size axis.
// next/font requires no `weight` array when using `axes`.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(FIRM.siteUrl),
  title: {
    default: `${FIRM.name} — Senior advisory · Strategy, Operations, Applied AI`,
    template: `%s — ${FIRM.name}`,
  },
  description:
    "Senior advisory across healthcare, talent acquisition, contingent workforce, and applied AI — designed as programs that hold under pressure. Charleston, SC.",
  openGraph: {
    title: `${FIRM.name} — Seven divisions. One operating discipline.`,
    description:
      "Senior advisory across healthcare, talent acquisition, contingent workforce, and applied AI — designed as programs that hold under pressure.",
    url: FIRM.siteUrl,
    siteName: FIRM.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: FIRM.name,
    description: "Seven divisions. One operating discipline.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable} ${sourceSerif.variable}`}
    >
      <body>
        {/* Chrome (smooth-scroll + preloader + cursor + scroll bar + pill nav)
            is a single client island so the whole app stays mostly RSC. */}
        <ChromeRoot>{children}</ChromeRoot>
      </body>
    </html>
  );
}
