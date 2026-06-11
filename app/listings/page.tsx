'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import FilterPills from '@/components/FilterPills';

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

function ListingsContent() {
  const searchParams  = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading]       = useState(true);
  const [category, setCategory]     = useState(searchParams.get('category') || 'All');
  const [showAvailable, setShowAvailable] = useState(false);
  const [searchQ, setSearchQ]       = useState(searchParams.get('search') || '');
  const [inputVal, setInputVal]     = useState(searchParams.get('search') || '');

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'All') params.set('category', category);
      if (showAvailable)       params.set('available', 'true');
      if (searchQ)             params.set('search', searchQ);
      const res  = await fetch(`/api/properties?${params}`);
      const data = await res.json();
      setProperties(data.data || []);
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [category, showAvailable, searchQ]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const allProperties = properties;

  return (
    <div className="min-h-screen pt-28 pb-16 page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-outfit font-semibold uppercase tracking-wider"
            style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', color: '#F5A623' }}>
            <i className="uil uil-sync" />
            Live Inventory
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="section-title text-3xl sm:text-4xl mb-2">
                Property <span className="text-gold-gradient">Listings</span>
              </h1>
              <p className="text-theme-secondary font-inter text-sm">
                Explore verified rentals across Sri Lanka. Filter by type or availability.
              </p>
            </div>

            {/* Search */}
            <div className="relative sm:w-72">
              <i className="uil uil-search absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted text-lg" />
              <input
                type="text"
                placeholder="Search listings..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') setSearchQ(inputVal); }}
                className="form-input form-input-icon-left form-input-icon-right text-sm bg-white dark:bg-white/5 shadow-sm"
              />
              {inputVal && (
                <button
                  onClick={() => { setInputVal(''); setSearchQ(''); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-primary"
                >
                  <i className="uil uil-times text-lg" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterPills
          selected={category}
          onSelect={setCategory}
          showAvailable={showAvailable}
          onToggleAvailable={() => setShowAvailable(!showAvailable)}
          totalCount={allProperties.length}
          filteredCount={allProperties.length}
        />

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card h-96 animate-pulse" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="h-52 rounded-t-[1.25rem]" style={{ background: 'var(--input-bg)' }} />
                <div className="p-5 space-y-3">
                  <div className="h-4 rounded-lg w-3/4" style={{ background: 'var(--input-bg)' }} />
                  <div className="h-3 rounded-lg w-1/2" style={{ background: 'var(--input-bg)' }} />
                  <div className="h-3 rounded-lg w-2/3" style={{ background: 'var(--input-bg)' }} />
                </div>
              </div>
            ))}
          </div>
        ) : allProperties.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.15)' }}>
              <i className="uil uil-search-alt text-3xl text-gold-500/50" />
            </div>
            <h3 className="font-outfit font-bold text-theme-primary text-xl mb-2">No listings found</h3>
            <p className="text-theme-secondary font-inter text-sm mb-6">
              Try adjusting your filters or search query.
            </p>
            <button onClick={() => { setCategory('All'); setShowAvailable(false); setSearchQ(''); setInputVal(''); }} className="btn-outline text-sm">
              <i className="uil uil-sync" />
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {allProperties.map((p, idx) => {
              const delays = ['delay-75', 'delay-100', 'delay-150', 'delay-200', 'delay-300', 'delay-400', 'delay-500'];
              const delayClass = idx < delays.length ? delays[idx] : '';
              return (
                <div key={p._id} className={`group animate-fade-in-up ${delayClass}`}>
                  <PropertyCard property={p} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full border-2 border-t-gold-500 border-theme-muted/20 animate-spin mx-auto mb-4" />
          <p className="text-theme-secondary font-inter">Loading listings...</p>
        </div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}
