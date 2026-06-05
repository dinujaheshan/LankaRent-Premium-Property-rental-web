'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const name     = searchParams.get('name') || 'Applicant';
  const property = searchParams.get('property') || 'the property';
  const [show, setShow] = useState(false);

  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center page-enter">
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Animated checkmark */}
        <div
          className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-700 ${show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
          style={{ background: 'linear-gradient(135deg,rgba(245,166,35,0.15),rgba(245,166,35,0.05))', border: '2px solid rgba(245,166,35,0.3)', boxShadow: '0 0 60px rgba(245,166,35,0.2)' }}
        >
          <i className="uil uil-check-circle text-6xl text-gold-500" />
        </div>

        <div className={`transition-all duration-700 delay-200 ${show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-outfit font-semibold uppercase tracking-wider"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}>
            <span className="dot-available" />
            Application Submitted
          </div>

          <h1 className="section-title text-3xl sm:text-4xl mb-4">
            Thank You,<br />
            <span className="text-gold-gradient">{name}!</span>
          </h1>

          <p className="text-white/60 font-inter text-base leading-relaxed mb-2">
            Your tenancy application for{' '}
            <span className="text-white/85 font-semibold">{property}</span>{' '}
            has been received and is now under review.
          </p>

          <p className="text-white/45 font-inter text-sm mb-10">
            Our team will review your application and contact you within 2-3 business days at the email address provided.
          </p>

          {/* Status card */}
          <div className="glass-card p-5 mb-8 text-left space-y-3">
            <h3 className="font-outfit font-semibold text-white text-sm mb-3">Application Status</h3>
            {[
              { icon: 'uil-check-circle',  color: '#4ade80', label: 'Application Received',   active: true  },
              { icon: 'uil-hourglass',     color: '#fbbf24', label: 'Under Review',            active: true  },
              { icon: 'uil-envelope',      color: '#93c5fd', label: 'Decision Notification',   active: false },
              { icon: 'uil-file-contract', color: '#d8b4fe', label: 'Lease Agreement',         active: false },
            ].map(({ icon, color, label, active }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: active ? `${color}20` : 'rgba(255,255,255,0.04)', border: `1px solid ${active ? color + '40' : 'rgba(255,255,255,0.08)'}` }}>
                  <i className={`uil ${icon} text-sm`} style={{ color: active ? color : 'rgba(255,255,255,0.25)' }} />
                </div>
                <span className={`font-inter text-sm ${active ? 'text-white/80' : 'text-white/30'}`}>{label}</span>
                {active && label === 'Under Review' && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-outfit font-semibold status-review badge">Under Review</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/listings" className="btn-gold text-sm">
              <i className="uil uil-th-large" />
              Browse More Listings
            </Link>
            <Link href="/" className="btn-outline text-sm">
              <i className="uil uil-home-alt" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full border-2 border-t-gold-500 border-white/10 animate-spin mx-auto mb-4" />
          <p className="text-white/50 font-inter">Loading confirmation details...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
