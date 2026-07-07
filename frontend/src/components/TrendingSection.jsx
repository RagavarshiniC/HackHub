import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import HackathonCard from './HackathonCard';
import { HACKATHONS } from '../data/mock';

const TrendingSection = () => {
  const trending = HACKATHONS.filter((h) => h.featured);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            Featured
          </div>
          <h2 className="mt-4 font-extrabold text-4xl sm:text-5xl">Trending now</h2>
          <p className="mt-3 text-muted-foreground">
            Hand-picked hackathons you don't want to miss.
          </p>
        </div>
        <Link
          to="/explore"
          className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-violet-600 transition-colors"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {trending.map((h) => (
          <HackathonCard key={h.id} h={h} />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
