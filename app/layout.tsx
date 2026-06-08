import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import ConditionalFooter from '@/components/ConditionalFooter';
import ThemeProvider from '@/components/ThemeProvider';

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
    <html lang="en" suppressHydrationWarning>
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
        {/* Prevent theme flash: set data-theme before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('lankarent-theme');
                  if (t === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <ConditionalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
