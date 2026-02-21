import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Kryvexis OS — Inventory, Invoicing & Purchasing",
  description:
    "Kryvexis OS helps small businesses control stock, capture sales, and manage purchasing — in one clean workflow.",
  applicationName: "Kryvexis OS",
  themeColor: "#0b1220",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Kryvexis OS",
    description:
      "Inventory, invoicing, and purchasing — built for real small-business workflows.",
    type: "website",
    images: [{ url: "/kryvexis-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kryvexis OS",
    description:
      "Inventory, invoicing, and purchasing — built for real small-business workflows.",
    images: ["/kryvexis-logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
