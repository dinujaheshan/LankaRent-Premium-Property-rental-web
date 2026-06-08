'use client';

const categories = ['All', 'Apartment', 'Studio', 'Office', 'Villa'];

const categoryIcons: Record<string, string> = {
  All:       'uil-apps',
  Apartment: 'uil-building',
  Studio:    'uil-home',
  Office:    'uil-briefcase-alt',
  Villa:     'uil-estate',
};

interface FilterPillsProps {
  selected: string;
  onSelect: (cat: string) => void;
  showAvailable: boolean;
  onToggleAvailable: () => void;
  totalCount: number;
  filteredCount: number;
}

export default function FilterPills({
  selected,
  onSelect,
  showAvailable,
  onToggleAvailable,
  totalCount,
  filteredCount,
}: FilterPillsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const active = selected === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-outfit font-semibold transition-all duration-200 ${
                active
                  ? 'text-navy-900 shadow-gold'
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
              style={
                active
                  ? { background: 'linear-gradient(135deg,#F5A623,#fbbf24)', boxShadow: '0 4px 20px rgba(245,166,35,0.3)' }
                  : { background: 'var(--input-bg)', border: '1px solid var(--border-color)' }
              }
            >
              <i className={`uil ${categoryIcons[cat]} text-base`} />
              {cat}
            </button>
          );
        })}
      </div>

      {/* Right side: availability toggle + count */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleAvailable}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-outfit font-semibold transition-all duration-200 ${
            showAvailable ? 'text-green-400' : 'text-theme-secondary hover:text-theme-primary'
          }`}
          style={{
            background: showAvailable ? 'rgba(34,197,94,0.1)' : 'var(--input-bg)',
            border: showAvailable ? '1px solid rgba(34,197,94,0.3)' : '1px solid var(--border-color)',
          }}
        >
          <span className={showAvailable ? 'dot-available' : 'dot-unavailable'} />
          Available Only
        </button>

        <div className="text-sm font-inter" style={{ color: 'var(--text-tertiary)' }}>
          <span className="font-outfit font-semibold" style={{ color: 'var(--text-primary)' }}>{filteredCount}</span>
          <span className="mx-1">/</span>
          {totalCount} listings
        </div>
      </div>
    </div>
  );
}
