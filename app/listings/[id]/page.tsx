'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Property {
  _id: string;
  title: string;
  category: string;
  location: string;
  district: string;
  monthlyRate: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  amenities: string[];
  petPolicy: string;
  utilitiesIncluded: string[];
  availableFrom: string;
  isAvailable: boolean;
  images: string[];
}

const TABS = ['Overview', 'Utilities', 'Pet Policy'];

const categoryConfig: Record<string, { badge: string; icon: string; color: string }> = {
  Apartment: { badge: 'badge-apartment', icon: 'uil-building',     color: '#93c5fd' },
  Studio:    { badge: 'badge-studio',    icon: 'uil-home',          color: '#d8b4fe' },
  Office:    { badge: 'badge-office',    icon: 'uil-briefcase-alt', color: '#86efac' },
  Villa:     { badge: 'badge-villa',     icon: 'uil-estate',        color: '#fcd34d' },
};

export default function ListingDetailPage() {
  const params   = useParams();
  const id       = params.id as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading]   = useState(true);
  const [tab, setTab]           = useState(0);

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then(r => r.json())
      .then(d => { setProperty(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full border-2 border-t-gold-500 border-white/10 animate-spin mx-auto mb-4" />
          <p className="text-white/50 font-inter">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center text-center">
        <div>
          <i className="uil uil-exclamation-circle text-5xl text-gold-500/50 block mb-4" />
          <h2 className="font-outfit font-bold text-white text-2xl mb-2">Property Not Found</h2>
          <Link href="/listings" className="btn-outline text-sm mt-4">
            <i className="uil uil-arrow-left" /> Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const cfg = categoryConfig[property.category] || categoryConfig.Apartment;
  const securityDeposit = property.monthlyRate * 2;
  const advanceRent     = property.monthlyRate;
  const totalUpfront    = securityDeposit + advanceRent;

  const availableDays = Math.max(0, Math.ceil((new Date(property.availableFrom).getTime() - Date.now()) / 86400000));

  return (
    <div className="min-h-screen pt-28 pb-16 page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm font-inter text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <i className="uil uil-angle-right" />
          <Link href="/listings" className="hover:text-white/70 transition-colors">Listings</Link>
          <i className="uil uil-angle-right" />
          <span className="text-white/70">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image + Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero Image */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
              <Image
                src={property.images?.[0] || '/images/hero1.png'}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`badge ${cfg.badge}`}>
                  <i className={`uil ${cfg.icon}`} />
                  {property.category}
                </span>
                <span className="badge" style={{
                  background: property.isAvailable ? '#064e3b' : '#7f1d1d',
                  color: property.isAvailable ? '#34d399' : '#f87171',
                  border: `1.5px solid ${property.isAvailable ? 'rgba(52,211,153,0.75)' : 'rgba(248,113,113,0.75)'}`,
                }}>
                  <span className={property.isAvailable ? 'dot-available' : 'dot-unavailable'} />
                  {property.isAvailable ? 'Available' : 'Rented'}
                </span>
              </div>
            </div>

            {/* Title row */}
            <div>
              <h1 className="font-outfit font-extrabold text-2xl sm:text-3xl text-white mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-white/55 font-inter text-sm">
                <i className="uil uil-map-marker text-gold-500 text-base" />
                {property.location}, {property.district} District
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: 'uil-bed',           label: 'Bedrooms',   val: property.bedrooms > 0 ? `${property.bedrooms} Bed${property.bedrooms !== 1 ? 's' : ''}` : 'N/A' },
                { icon: 'uil-bath',          label: 'Bathrooms',  val: `${property.bathrooms} Bath${property.bathrooms !== 1 ? 's' : ''}` },
                { icon: 'uil-ruler-combined',label: 'Floor Area',  val: `${property.areaSqft.toLocaleString()} sqft` },
                { icon: 'uil-clock',         label: 'Available',  val: availableDays === 0 ? 'Now' : `${availableDays}d` },
              ].map(({ icon, label, val }) => (
                <div key={label} className="glass-card p-4 text-center">
                  <i className={`uil ${icon} text-gold-500 text-xl block mb-1`} />
                  <div className="font-outfit font-bold text-white text-sm">{val}</div>
                  <div className="text-white/40 text-xs font-inter mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="glass-card overflow-hidden">
              <div className="flex border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {TABS.map((t, i) => (
                  <button key={t} onClick={() => setTab(i)} className={`tab-btn flex-1 ${tab === i ? 'active' : ''}`}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {tab === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-outfit font-semibold text-white text-sm mb-3">Description</h3>
                      <p className="text-white/60 font-inter text-sm leading-relaxed">{property.description}</p>
                    </div>
                    <div>
                      <h3 className="font-outfit font-semibold text-white text-sm mb-3">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map((a) => (
                          <span key={a} className="px-3 py-1.5 rounded-xl text-xs font-inter text-white/70"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <i className="uil uil-check-circle text-gold-500 mr-1" />{a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {tab === 1 && (
                  <div>
                    <h3 className="font-outfit font-semibold text-white text-sm mb-4">Utilities Included in Rent</h3>
                    {property.utilitiesIncluded.length > 0 ? (
                      <div className="space-y-2">
                        {property.utilitiesIncluded.map((u) => (
                          <div key={u} className="flex items-center gap-3 p-3 rounded-xl"
                            style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)' }}>
                            <i className="uil uil-check-circle text-green-400 text-base" />
                            <span className="text-white/70 font-inter text-sm">{u}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/40 font-inter text-sm">No utilities included. Tenant is responsible for all utility connections.</p>
                    )}
                    <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.12)' }}>
                      <p className="text-white/50 font-inter text-xs leading-relaxed">
                        <i className="uil uil-info-circle text-gold-500 mr-1" />
                        Additional utilities not listed above are the responsibility of the tenant. Please confirm all inclusions with the landlord before signing.
                      </p>
                    </div>
                  </div>
                )}

                {tab === 2 && (
                  <div>
                    <div className="flex items-start gap-4 p-5 rounded-xl mb-4"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <i className="uil uil-paw text-gold-500 text-2xl mt-0.5" />
                      <div>
                        <h3 className="font-outfit font-semibold text-white text-sm mb-1.5">Pet Policy</h3>
                        <p className="text-white/65 font-inter text-sm leading-relaxed">{property.petPolicy}</p>
                      </div>
                    </div>
                    <p className="text-white/40 font-inter text-xs">
                      All pet arrangements must be declared during the application process. Unauthorized pets may result in lease termination.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Pricing + CTA */}
          <div className="space-y-5">
            {/* Price card */}
            <div className="glass-card p-6">
              <div className="mb-4">
                <div className="text-white/45 text-xs font-inter mb-1">Monthly Rental</div>
                <div className="font-outfit font-extrabold text-2xl text-gold-500">
                  LKR {property.monthlyRate.toLocaleString()}
                </div>
                <div className="text-white/35 text-xs font-inter mt-1">per month</div>
              </div>

              {/* Cost calculator */}
              <div className="space-y-2 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex justify-between text-sm font-inter">
                  <span className="text-white/55">Security Deposit (2 mo.)</span>
                  <span className="text-white/80 font-outfit font-semibold">LKR {securityDeposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-inter">
                  <span className="text-white/55">Advance Rent (1 mo.)</span>
                  <span className="text-white/80 font-outfit font-semibold">LKR {advanceRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-inter pt-2 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-white font-outfit font-bold">Total Move-in Cost</span>
                  <span className="text-gold-500 font-outfit font-extrabold">LKR {totalUpfront.toLocaleString()}</span>
                </div>
              </div>

              {property.isAvailable ? (
                <Link href={`/apply/${property._id}`} className="btn-gold w-full justify-center mt-4">
                  <i className="uil uil-file-contract" />
                  Apply to Rent
                </Link>
              ) : (
                <div className="mt-4 p-3 rounded-xl text-center text-sm font-outfit font-semibold text-red-400"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <i className="uil uil-times-circle mr-2" />
                  Currently Unavailable
                </div>
              )}
            </div>

            {/* Availability info */}
            <div className="glass-card p-5 space-y-3">
              <h4 className="font-outfit font-semibold text-white text-sm">Availability Info</h4>
              <div className="flex items-center gap-3 text-sm font-inter">
                <i className="uil uil-calendar-alt text-gold-500 text-lg" />
                <div>
                  <div className="text-white/40 text-xs mb-0.5">Available From</div>
                  <div className="text-white/80">{new Date(property.availableFrom).toLocaleDateString('en-LK', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm font-inter">
                <i className="uil uil-map text-gold-500 text-lg" />
                <div>
                  <div className="text-white/40 text-xs mb-0.5">District</div>
                  <div className="text-white/80">{property.district}</div>
                </div>
              </div>
            </div>

            {/* Help link */}
            <div className="glass-card p-5">
              <p className="text-white/50 font-inter text-xs mb-3 leading-relaxed">
                Have questions about this property? Our team is here to help you.
              </p>
              <Link href="/help" className="btn-outline text-xs w-full justify-center">
                <i className="uil uil-comment-question" />
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
