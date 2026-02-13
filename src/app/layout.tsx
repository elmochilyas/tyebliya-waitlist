import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tyebliya.com"),
  title: "TyebLiya | Authentic Home-Cooked Meals Waitlist",
  description: "Join the waitlist for TyebLiya and get authentic home-cooked meals delivered to your doorstep. Be the first to taste the revolution!",
  keywords: ["homemade food", "delivery", "home-cooked meals", "TyebLiya", "waitlist"],
  authors: [{ name: "TyebLiya Team" }],
  openGraph: {
    title: "TyebLiya | Authentic Home-Cooked Meals Waitlist",
    description: "Join the waitlist for TyebLiya and get authentic home-cooked meals delivered to your doorstep.",
    url: "https://tyebliya.com",
    siteName: "TyebLiya",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TyebLiya - Authentic Home-Cooked Meals",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TyebLiya | Authentic Home-Cooked Meals Waitlist",
    description: "Join the waitlist for TyebLiya and get authentic home-cooked meals delivered to your doorstep.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Google Analytics */}
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
        {children}
      </body>
    </html>
  );
}
