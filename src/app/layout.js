import { Providers } from "@/components/providers";
import "./globals.css";
import NavBar from "@/components/NavBar"; // adjust path
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://khalahobe.vercel.app"; // your real domain

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Khalahobe | Book Playgrounds & Sports Facilities Online",
    template: "%s | Khalahobe",
  },
  description:
    "Khalahobe is a playground booking platform. Discover nearby sports facilities, check availability, and book your slot in seconds.",
  keywords: [
    "playground booking",
    "sports facility booking",
    "book football turf",
    "cricket ground booking",
    "Khalahobe",
    "Bangladesh",
  ],
  applicationName: "Khalahobe",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Khalahobe",
    title: "Khalahobe | Book Playgrounds & Sports Facilities Online",
    description: "Discover and book playgrounds, turfs, and sports facilities near you.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Khalahobe playground booking" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalahobe | Playground Booking Platform",
    description: "Discover and book playgrounds, turfs, and sports facilities near you.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f12" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Khalahobe",
  url: siteUrl,
  description: "Playground and sports facility booking platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ background: "var(--k-bg)", color: "var(--k-text)" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <Providers>
          <NavBar />
          <main id="main-content">
            {children}

          </main>
           
           <footer>
            <Footer/>
           </footer>

        </Providers>
        
      </body>
     
    </html>
  );
}