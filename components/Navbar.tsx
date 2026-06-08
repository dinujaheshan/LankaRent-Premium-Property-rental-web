'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';

const navLinks = [
  { href: '/',          label: 'Home',       icon: 'uil-estate' },
  { href: '/listings',  label: 'Listings',   icon: 'uil-building' },
  { href: '/track',     label: 'Track',      icon: 'uil-history' },
  { href: '/help',      label: 'Help',       icon: 'uil-question-circle' },
];

export default function Navbar() {
  const pathname   = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-4'
      }`}
      style={{
        background: scrolled
          ? 'var(--nav-bg-scrolled)'
          : 'var(--nav-bg)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--nav-border)',
        boxShadow: scrolled ? 'var(--glass-shadow)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Logo className="w-9 h-9 transition-transform duration-300 group-hover:scale-105" />
            <span className="font-outfit font-extrabold text-xl" style={{ color: 'var(--text-primary)' }}>
              Lanka<span className="text-gold-500">Rent</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-inter font-semibold transition-all duration-200 ${
                    active
                      ? 'text-gold-500'
                      : ''
                  }`}
                  style={active 
                    ? { background: 'var(--nav-link-active-bg)', border: '1px solid rgba(245, 166, 35, 0.3)', boxShadow: '0 0 12px rgba(245, 166, 35, 0.08)' }
                    : { color: 'var(--text-tertiary)' }
                  }
                >
                  <i className={`uil ${icon} text-base`} />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <i className={`uil ${theme === 'light' ? 'uil-moon' : 'uil-sun'} text-lg`} />
            </button>
            <Link href="/listings" className="btn-gold text-sm py-2.5 px-5">
              <i className="uil uil-search text-base" />
              Browse Properties
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              <i className={`uil ${theme === 'light' ? 'uil-moon' : 'uil-sun'} text-lg`} />
            </button>
            <button
              className="p-2"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <i className={`uil text-2xl ${mobileOpen ? 'uil-times' : 'uil-bars'}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pb-4 glass-card p-4 space-y-1">
            {navLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-inter transition-all ${
                  pathname === href ? 'text-gold-500' : ''
                }`}
                style={pathname === href 
                  ? { background: 'var(--nav-link-active-bg)' }
                  : { color: 'var(--text-tertiary)' }
                }
              >
                <i className={`uil ${icon} text-base`} />
                {label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2" style={{ borderTop: '1px solid var(--border-color)' }}>
              <Link href="/listings" onClick={() => setMobileOpen(false)} className="btn-gold text-sm justify-center">
                <i className="uil uil-search" />
                Browse Properties
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
