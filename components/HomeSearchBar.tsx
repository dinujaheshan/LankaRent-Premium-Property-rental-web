'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeSearchBar() {
  const router = useRouter();
  const [inputVal, setInputVal] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (inputVal.trim()) params.set('search', inputVal.trim());
    if (category)        params.set('category', category);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <i className="uil uil-search absolute left-4 top-1/2 -translate-y-1/2 text-xl" style={{ color: 'var(--text-tertiary)' }} />
        <input
          type="text"
          placeholder="Search by location, district or property name..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          className="form-input form-input-icon-left bg-white dark:bg-white/5 shadow-sm"
        />
      </div>
      <select
        className="form-select sm:w-44 bg-white dark:bg-white/5 shadow-sm"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="Apartment">Apartment</option>
        <option value="Studio">Studio</option>
        <option value="Office">Office</option>
        <option value="Villa">Villa</option>
      </select>
      <button onClick={handleSearch} className="btn-gold whitespace-nowrap">
        <i className="uil uil-search-alt text-base" />
        Search
      </button>
    </div>
  );
}
