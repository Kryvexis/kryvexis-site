import "./globals.css";

export const metadata = {
  title: "Kryvexis OS — Inventory, Invoicing & Purchasing",
  description: "Kryvexis OS helps small businesses control stock, capture sales, and manage purchasing — in one clean workflow.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
