import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",            // Eliminate FOIT
  preload: true,              // Preload critical font
  variable: "--font-inter",   // CSS variable for flexibility
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,  // Allow zooming for accessibility
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tyebliya.com"),
  title: "TyebLiya — Home Food, Made with Heart",
  description: "Morocco's first home chef marketplace. Order authentic home-cooked meals from verified local chefs, delivered fresh to your door.",
  keywords: ["home food", "home chef", "Morocco", "delivery", "homemade meals", "TyebLiya", "marketplace"],
  authors: [{ name: "TyebLiya" }],
  openGraph: {
    title: "TyebLiya — Home Food, Made with Heart",
    description: "Morocco's first home chef marketplace. Order authentic home-cooked meals from verified local chefs.",
    url: "https://tyebliya.com",
    siteName: "TyebLiya",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "TyebLiya — Home Food, Made with Heart",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TyebLiya — Home Food, Made with Heart",
    description: "Morocco's first home chef marketplace. Order authentic home-cooked meals from verified local chefs.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {/* Google Analytics — non-blocking */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
