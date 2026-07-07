'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import HackathonCard from './HackathonCard';

const CATEGORIES = ['All', 'AI/ML', 'Web3', 'DevOps', 'FinTech', 'Design', 'ClimateTech'];
const MODES = ['All', 'Online', 'Hybrid', 'In-person'];

export default function ExploreClient({ hackathons }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [mode, setMode] = useState('All');

  const list = useMemo(() => {
    return hackathons.filter((h) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        h.title.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        (h.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchesCat = cat === 'All' || h.category === cat;
      const matchesMode = mode === 'All' || h.mode === mode;
      return matchesQuery && matchesCat && matchesMode;
    });
  }, [query, cat, mode, hackathons]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Explore
          </div>
          <h1 className="mt-4 font-extrabold text-4xl sm:text-5xl">
            Find your next <span className="brand-gradient-text">hackathon</span>.
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Browse upcoming events by category, mode, and prize pool.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hackathons"
            className="pl-9 rounded-full h-11 w-full border bg-background px-3 outline-none focus:border-violet-500"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              cat === c ? 'brand-gradient-bg text-white border-transparent shadow-sm' : 'bg-background border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              mode === m ? 'bg-foreground text-background border-transparent' : 'bg-transparent text-muted-foreground border-border hover:text-foreground'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((h) => (<HackathonCard key={h.id} h={h} />))}
      </div>

      {list.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          No hackathons match your filters.
        </div>
      )}
    </div>
  );
}
