import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "World Liberty AI | AI-Powered Financial Intelligence – $WLFI",
  description:
    "World Liberty AI ($WLFI) is an AI-powered financial intelligence platform that analyzes top crypto coins in real-time. Gain insights into market trends, whale activity, and AI-generated summaries — all inside our Telegram Mini App.",
  keywords:
    "World Liberty AI, WLFI, crypto AI, blockchain analytics, whale tracking, AI crypto insights, CoinAPI, DeFi, Bitcoin, Ethereum, cryptocurrency trends, Telegram Mini App",
  authors: [{ name: "World Liberty AI" }],
  creator: "World Liberty AI Team",
  publisher: "World Liberty AI Labs",
  robots: "index, follow",
  openGraph: {
    title: "World Liberty AI | Real-Time Crypto Intelligence – $WLFI",
    description:
      "Discover World Liberty AI – the AI-powered crypto assistant that analyzes top coins, detects whale moves, and delivers real-time insights. Accessible via Telegram Mini App.",
    siteName: "World Liberty AI – $WLFI",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "World Liberty AI – AI-Powered Financial Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@worldlibertyai",
    creator: "@worldlibertyai",
    title: "World Liberty AI | AI-Powered Crypto Insights – $WLFI",
    description:
      "Stay ahead with World Liberty AI. Real-time summaries, whale tracking, and AI-powered crypto insights, all inside Telegram.",
    images: ["/og-image.png"],
  },
  viewport:
    "width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover",
  category: "cryptocurrency",
  classification: "AI Financial Intelligence, Cryptocurrency, Blockchain, DeFi",
  other: {
    "application-name": "World Liberty AI",
    "mobile-web-app-capable": "yes",
    "mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Favicon / Tab Icons */}
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* ✅ OG Image Meta Fallback */}
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#171412] flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
