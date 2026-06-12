import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientEffects from "./components/ClientEffects";

export const metadata: Metadata = {
  title: "TrueNorth — AI Conversation Engine | Declare the Outcome",
  description:
    "Define your AI agent in YAML. TrueNorth runs the conversation — extraction, safety, compliance, WhatsApp delivery. Open Source · Apache 2.0.",
  keywords: ["AI agent", "YAML", "LLM", "conversation engine", "India", "DPDP", "compliance"],
  openGraph: {
    title: "TrueNorth — AI Conversation Engine",
    description: "Declare the outcome, skip the logic. Developer-first AI conversation engine for India and global teams.",
    type: "website",
    url: "https://truenorth.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueNorth — AI Conversation Engine",
    description: "Declare the outcome, skip the logic.",
    creator: "@truenorthai",
  },
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0A0B0D] text-[#F0F2F5] antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div id="cursor-glow" aria-hidden="true" />
        <div id="scroll-progress" aria-hidden="true" />
        <ClientEffects />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
