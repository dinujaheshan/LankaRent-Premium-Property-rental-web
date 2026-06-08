import Link from 'next/link';
import Image from 'next/image';

interface Property {
  _id: string;
  title: string;
  category: string;
  location: string;
  district: string;
  monthlyRate: number;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  isAvailable: boolean;
  availableFrom: string;
  images: string[];
}

const categoryConfig: Record<string, { badge: string; icon: string }> = {
  Apartment: { badge: 'badge-apartment', icon: 'uil-building' },
  Studio:    { badge: 'badge-studio',    icon: 'uil-home' },
  Office:    { badge: 'badge-office',    icon: 'uil-briefcase-alt' },
  Villa:     { badge: 'badge-villa',     icon: 'uil-estate' },
};

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

export default function PropertyCard({ property }: { property: Property }) {
  const cfg  = categoryConfig[property.category] || categoryConfig.Apartment;
  const days = daysUntil(property.availableFrom);

  return (
    <div className="glass-card-hover overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative h-52 overflow-hidden rounded-t-[1.25rem]">
        <Image
          src={property.images?.[0] || '/images/hero1.png'}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />

        {/* Top overlay row — category left, availability right, flex so they never collide */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {/* Category badge */}
          <span className={`badge ${cfg.badge} shrink-0 pointer-events-auto`}>
            <i className={`uil ${cfg.icon} mr-1`} />
            {property.category}
          </span>

          {/* Availability pill */}
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-outfit font-bold shrink-0 pointer-events-auto"
            style={{
              background: property.isAvailable ? '#064e3b' : '#7f1d1d',
              border: `1.5px solid ${property.isAvailable ? 'rgba(52,211,153,0.75)' : 'rgba(248,113,113,0.75)'}`,
              color: property.isAvailable ? '#34d399' : '#f87171',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            <span className={property.isAvailable ? 'dot-available' : 'dot-unavailable'} />
            {property.isAvailable ? 'Available' : 'Rented'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-outfit font-bold text-theme-primary text-base leading-tight line-clamp-2 mb-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-sm text-theme-secondary font-inter mb-4">
          <i className="uil uil-map-marker text-gold-500 text-base shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Specs row */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 mb-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1 text-xs text-theme-secondary font-inter">
              <i className="uil uil-bed text-gold-500/70 text-sm shrink-0" />
              <span>{property.bedrooms} Bed{property.bedrooms !== 1 ? 's' : ''}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-theme-secondary font-inter">
            <i className="uil uil-bath text-gold-500/70 text-sm shrink-0" />
            <span>{property.bathrooms} Bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-theme-secondary font-inter">
            <i className="uil uil-ruler-combined text-gold-500/70 text-sm shrink-0" />
            <span>{property.areaSqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Availability countdown */}
        {property.isAvailable && (
          <div
            className="flex items-center gap-1.5 text-xs font-inter mb-4 px-3 py-2 rounded-lg"
            style={{ background: 'rgba(245,166,35,0.07)', border: '1px solid rgba(245,166,35,0.12)' }}
          >
            <i className="uil uil-clock text-gold-500 text-sm shrink-0" />
            <span className="text-theme-secondary">
              {days === 0 ? 'Available now' : `Available in ${days} day${days !== 1 ? 's' : ''}`}
            </span>
          </div>
        )}

        <div className="flex-1" />

        {/* Price & CTA Stack */}
        <div
          className="mt-2 pt-4 space-y-3.5"
          style={{ borderTop: '1px solid var(--border-color)' }}
        >
          {/* Price Row */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-theme-secondary font-inter">Monthly Rental</span>
            <span className="font-outfit font-extrabold text-base text-gold-500">
              LKR {property.monthlyRate.toLocaleString()}
            </span>
          </div>

          {/* Buttons Row */}
          <div className="flex gap-2">
            <Link
              href={`/listings/${property._id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-outfit font-bold transition-all duration-200"
              style={{ background: 'var(--input-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
            >
              <i className="uil uil-eye text-sm shrink-0" />
              <span>Details</span>
            </Link>
            {property.isAvailable ? (
              <Link
                href={`/apply/${property._id}`}
                className="flex-1 btn-gold text-xs py-2.5 px-3 inline-flex items-center justify-center gap-1.5"
              >
                <i className="uil uil-file-contract text-sm shrink-0" />
                <span>Apply</span>
              </Link>
            ) : (
              <div className="flex-1 px-3 py-2.5 rounded-xl text-center text-xs font-outfit font-bold text-red-400 bg-red-400/10 border border-red-400/20">
                Rented
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
