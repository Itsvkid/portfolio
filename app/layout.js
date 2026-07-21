import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

const title = "Vinaykumar Venkateshkumar — Propulsion / CFD Engineer";
const description =
  "Portfolio of Vinaykumar Venkateshkumar — propulsion and CFD engineering graduate specialising in ANSYS Fluent simulation, jet flow control, and parametric CAD for nacelle installation aerodynamics.";

export const metadata = {
  metadataBase: new URL("https://vinaykumar.is-a.dev"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description:
      "Propulsion and CFD engineering portfolio — jet mixing CFD, nacelle installation aerodynamics, parametric CAD.",
    type: "website",
    url: "/",
    siteName: "Vinaykumar Venkateshkumar",
    images: ["/headshot.jpg"],
  },
  twitter: {
    card: "summary",
    title,
    description:
      "Propulsion and CFD engineering portfolio — jet mixing CFD, nacelle installation aerodynamics, parametric CAD.",
    images: ["/headshot.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Arms the reveal animation's initial hidden state before first paint.
            Without JS the class is never added and all content renders visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="bg-bg0 font-sans text-fg1 antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
