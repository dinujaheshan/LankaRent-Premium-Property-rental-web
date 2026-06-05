import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LankaRent | Premium Property Rentals in Sri Lanka',
  description: 'Discover luxury apartments, villas, studios, and executive offices across Sri Lanka. Find your perfect rental property with LankaRent - the island\'s most trusted rental platform.',
  keywords: 'Sri Lanka property rental, Colombo apartments, Galle villas, Kandy offices, LankaRent',
  openGraph: {
    title: 'LankaRent | Premium Property Rentals in Sri Lanka',
    description: 'Discover luxury apartments, villas, studios, and executive offices across Sri Lanka.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        />
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.8/css/solid.css"
        />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
