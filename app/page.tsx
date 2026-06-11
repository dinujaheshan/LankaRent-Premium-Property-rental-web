import Link from 'next/link';
import HomeSearchBar from '@/components/HomeSearchBar';
import HeroCarousel from '@/components/HeroCarousel';
import dbConnect from '@/lib/mongodb';
import Property from '@/lib/models/Property';
import PropertyCard from '@/components/PropertyCard';

export const dynamic = 'force-dynamic';

const zones = [
  {
    id: 'Apartment',
    icon: 'uil-building',
    label: 'Urban Apartments',
    desc: 'Modern high-rise living in Colombo, Kandy and major Sri Lankan cities with premium amenities.',
    count: '80+ listings',
    className: 'zone-apartment',
  },
  {
    id: 'Studio',
    icon: 'uil-home',
    label: 'Shared Studios',
    desc: 'Affordable furnished studios for solo travelers, students, and digital nomads across the island.',
    count: '45+ listings',
    className: 'zone-studio',
  },
  {
    id: 'Office',
    icon: 'uil-briefcase-alt',
    label: 'Executive Offices',
    desc: 'Grade-A commercial spaces and co-working hubs in prime business districts island-wide.',
    count: '30+ listings',
    className: 'zone-office',
  },
  {
    id: 'Villa',
    icon: 'uil-estate',
    label: 'Luxury Villas',
    desc: 'Exclusive oceanfront estates and mountain retreats with private pools and world-class facilities.',
    count: '25+ listings',
    className: 'zone-villa',
  },
];

const features = [
  { icon: 'uil-shield-check', title: 'Verified Listings',   desc: 'Every property is verified by our local inspection team before going live.' },
  { icon: 'uil-file-contract', title: 'Digital Applications', desc: 'Apply online in minutes with our streamlined multi-step tenancy workflow.' },
  { icon: 'uil-calculator-alt', title: 'Cost Calculator',     desc: 'Instantly calculate move-in costs, deposits, and monthly commitments upfront.' },
  { icon: 'uil-headphones',    title: '24/7 Support',         desc: 'Dedicated support team available around the clock for tenants and landlords.' },
];

export default async function HomePage() {
  await dbConnect();
  
  // Find one of each category to showcase variety on the homepage
  const categories = ['Apartment', 'Studio', 'Office', 'Villa'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const featuredProperties: any[] = [];
  
  for (const cat of categories) {
    const prop = await Property.findOne({ category: cat, isAvailable: true }).sort({ createdAt: -1 }).lean();
    if (prop) {
      featuredProperties.push(JSON.parse(JSON.stringify(prop)));
    }
  }

  // Fallback: if not enough variety, grab any available properties
  if (featuredProperties.length < 4) {
    const fallbackProps = await Property.find({ isAvailable: true }).limit(4 - featuredProperties.length).lean();
    for (const p of fallbackProps) {
      if (!featuredProperties.some(fp => fp._id === p._id.toString())) {
        featuredProperties.push(JSON.parse(JSON.stringify(p)));
      }
    }
  }

  return (
    <div className="page-enter">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Search Banner */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 -mt-12">
        <div className="glass-card p-5 shadow-glass">
          <HomeSearchBar />
        </div>
      </section>

      {/* Zone Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-outfit font-semibold tracking-wider uppercase"
            style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', color: '#F5A623' }}>
            <i className="uil uil-map-pin-alt" />
            Zone Highlights
          </div>
          <h2 className="section-title text-3xl sm:text-4xl mb-4">
            Find Your Perfect{' '}
            <span className="text-gold-gradient">Property Type</span>
          </h2>
          <p className="text-theme-secondary font-inter max-w-xl mx-auto leading-relaxed">
            From bustling city apartments to serene coastal villas, discover every style of living and working across Sri Lanka.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {zones.map((zone) => (
            <Link
              key={zone.id}
              href={`/listings?category=${zone.id}`}
              className={`glass-card-hover p-6 group flex flex-col gap-4 ${zone.className}`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 zone-icon-wrapper">
                <i className={`uil ${zone.icon} text-2xl zone-icon`} />
              </div>

              <div>
                <h3 className="font-outfit font-bold text-theme-primary text-base mb-1.5">{zone.label}</h3>
                <p className="text-theme-secondary text-sm font-inter leading-relaxed">{zone.desc}</p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
                <span className="text-xs font-outfit font-semibold zone-count">{zone.count}</span>
                <i className="uil uil-arrow-right text-theme-muted group-hover:text-gold-500 transition-colors text-lg" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-outfit font-bold tracking-wider uppercase"
            style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', color: '#F5A623' }}>
            <i className="uil uil-star" />
            Curated Spaces
          </div>
          <h2 className="section-title text-3xl sm:text-4xl mb-4">
            Featured <span className="text-gold-gradient">Properties</span>
          </h2>
          <p className="text-theme-secondary font-inter max-w-xl mx-auto leading-relaxed">
            Explore handpicked, premium rentals available right now. Click on any listing to view detailed upfront costs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property, idx) => {
            const delays = ['delay-75', 'delay-150', 'delay-200', 'delay-300'];
            return (
              <div key={property._id} className={`group animate-fade-in-up ${delays[idx] || ''}`}>
                <PropertyCard property={property} />
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/listings" className="btn-outline text-sm">
            <i className="uil uil-arrow-right mr-1" />
            View All Listings
          </Link>
        </div>
      </section>

      {/* Why LankaRent */}
      <section className="py-20" style={{ background: 'var(--input-bg)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title text-3xl sm:text-4xl mb-4">
              Why Choose <span className="text-gold-gradient">LankaRent</span>?
            </h2>
            <p className="text-theme-secondary font-inter max-w-xl mx-auto">
              The trusted rental platform built for Sri Lanka, with local knowledge and world-class technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.2)' }}>
                  <i className={`uil ${f.icon} text-2xl text-gold-500`} />
                </div>
                <h4 className="font-outfit font-bold text-theme-primary text-sm mb-2">{f.title}</h4>
                <p className="text-theme-secondary text-xs font-inter leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="glass-card p-10 sm:p-16 text-center relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle,#F5A623,transparent)' }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-outfit font-semibold uppercase tracking-wider"
              style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.25)', color: '#F5A623' }}>
              <i className="uil uil-fire" />
              Limited Availability
            </div>
            <h2 className="section-title text-3xl sm:text-5xl mb-5">
              Ready to Find Your<br />
              <span className="text-gold-gradient">Perfect Rental?</span>
            </h2>
            <p className="text-theme-secondary font-inter mb-8 max-w-md mx-auto">
              Browse verified listings across Sri Lanka and submit your application in under 5 minutes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/listings" className="btn-gold">
                <i className="uil uil-th-large" />
                Browse All Listings
              </Link>
              <Link href="/help" className="btn-outline">
                <i className="uil uil-comment-question" />
                Get Help
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
