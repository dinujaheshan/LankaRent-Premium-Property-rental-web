import Link from 'next/link';
import Logo from '@/components/Logo';

const footerLinks = {
  Platform: [
    { label: 'Browse Listings',     href: '/listings' },
    { label: 'Apply to Rent',       href: '/listings' },
    { label: 'Track Application',   href: '/track' },
    { label: 'Help & Inquiries',    href: '/help' },
  ],
  Categories: [
    { label: 'Apartments',          href: '/listings?category=Apartment' },
    { label: 'Studios',             href: '/listings?category=Studio' },
    { label: 'Executive Offices',   href: '/listings?category=Office' },
    { label: 'Luxury Villas',       href: '/listings?category=Villa' },
  ],
  Company: [
    { label: 'Privacy Policy',      href: '#' },
    { label: 'Terms of Service',    href: '#' },
    { label: 'Contact Us',          href: '/help' },
  ],
};

const districts = ['Colombo', 'Kandy', 'Galle', 'Negombo', 'Batticaloa', 'Nuwara Eliya'];

export default function Footer() {
  return (
    <footer className="relative mt-24" style={{ background: 'var(--footer-bg)', borderTop: '2px solid var(--footer-border)', boxShadow: '0 -10px 40px rgba(0,0,0,0.4)' }}>
      {/* Gold glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-0.5" style={{ background: 'linear-gradient(90deg,transparent,#F5A623,transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <Logo className="w-9 h-9 transition-transform duration-300 group-hover:scale-105" />
              <span className="font-outfit font-extrabold text-xl text-white">
                Lanka<span className="text-gold-500">Rent</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm font-inter leading-relaxed max-w-xs">
              Sri Lanka&apos;s premier property rental platform. Connecting quality landlords with discerning tenants across the island.
            </p>

            {/* Districts */}
            <div className="mt-5 flex flex-wrap gap-2">
              {districts.map((d) => (
                <span key={d} className="text-xs px-3 py-1 rounded-full font-inter font-semibold" style={{ background: 'rgba(245,166,35,0.12)', color: '#fbbf24', border: '1px solid rgba(245,166,35,0.3)' }}>
                  {d}
                </span>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-2">
              <a href="tel:+94112345678" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors font-medium">
                <i className="uil uil-phone text-gold-500 text-base" />
                +94 11 234 5678
              </a>
              <a href="mailto:hello@lankarent.lk" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors font-medium">
                <i className="uil uil-envelope text-gold-500 text-base" />
                hello@lankarent.lk
              </a>
              <div className="flex items-center gap-2 text-sm text-white/70 font-medium">
                <i className="uil uil-map-marker text-gold-500 text-base" />
                Colombo 03, Sri Lanka
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-outfit font-bold text-white text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5 font-semibold">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-white/60 hover:text-gold-500 text-sm font-inter transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-white/50 text-xs font-inter font-medium">
            &copy; {new Date().getFullYear()} LankaRent (Pvt) Ltd. All rights reserved. Registered in Sri Lanka.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: 'uil-facebook-f', href: '#' },
              { icon: 'uil-instagram',  href: '#' },
              { icon: 'uil-linkedin',   href: '#' },
              { icon: 'uil-twitter-alt', href: '#' },
            ].map(({ icon, href }) => (
              <a
                key={icon}
                href={href}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <i className={`uil ${icon} text-sm text-white/70 hover:text-gold-500`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
