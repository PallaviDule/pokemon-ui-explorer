'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBox({ initialValue = '' }) {
  const [term, setTerm] = useState(initialValue);
  const router = useRouter();

  const handleSearch = () => {
    if (term.trim()) {
      router.push(`/?name=${term.toLowerCase()}`);
    } else {
      router.push('/?page=1');
    }
  };

  return (
    <div className="mb-2">
      <div className="flex justify-end">
        <div className="flex border border-gray-300 rounded-md overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search by name"
            className="px-3 py-1 text-sm outline-none w-52 border-r border-gray-300"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button
            onClick={handleSearch}
            className="px-3 py-1 bg-blue-600 text-white text-sm hover:bg-blue-800 transition font-bold"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
