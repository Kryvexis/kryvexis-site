import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";

export const metadata: Metadata = {
  title: "Kryvexis",
  description: "Remote IT Support • Automation • OCR Systems",
};

const WHATSAPP_NUMBER = "27686282874";

function waHref() {
  const text = encodeURIComponent(
    "Hi Kryvexis 👋 I need help with Remote IT / Automation / OCR. My issue is:"
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-[color:var(--k-text)]">
        {/* Background layers */}
        <div className="k-heroGlow" />
        <div className="k-glow" />
        <div className="k-grid" />
        <div className="k-noise" />
        <div className="k-vignette" />

        {/* Global navigation */}
        <TopNav />

        {/* Page content */}
        <main>{children}</main>

        {/* Floating WhatsApp */}
        <a
          className="k-fab"
          href={waHref()}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat to Kryvexis on WhatsApp"
          title="WhatsApp Kryvexis"
        >
          <span className="k-fab-tip">WhatsApp • Fast reply</span>
          <span className="k-fab-badge" />
          {/* WhatsApp SVG icon */}
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path
              fill="rgba(52,211,153,1)"
              d="M16 2.4C8.6 2.4 2.6 8.2 2.6 15.4c0 2.5.8 4.9 2.1 6.9L3 29.6l7.5-1.9c1.9 1 4 1.5 6.4 1.5 7.4 0 13.4-5.8 13.4-13S23.4 2.4 16 2.4zm0 23.2c-2.1 0-4.1-.6-5.9-1.7l-.4-.2-4.4 1.1 1.2-4.1-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9 0-6.1 5.1-11 11.4-11s11.4 4.9 11.4 11-5.1 11.2-11.2 11.2z"
            />
            <path
              fill="rgba(229,231,235,.92)"
              d="M22.3 18.8c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.1-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.4-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.1.2 2.3 3.6 5.7 5 3.4 1.4 3.4.9 4 .9.6 0 1.8-.7 2-1.3.2-.6.2-1.1.1-1.3-.1-.2-.3-.2-.6-.3z"
            />
          </svg>
        </a>
      </body>
    </html>
  );
}
