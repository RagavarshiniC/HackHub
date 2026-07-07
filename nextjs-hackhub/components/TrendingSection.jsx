import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import HackathonCard from './HackathonCard';

export default function TrendingSection({ hackathons = [] }) {
  if (!hackathons.length) return null;
  const plain = hackathons.map((h) => ({
    ...h,
    date: typeof h.date === 'string' ? h.date : h.date.toISOString().slice(0, 10),
  }));

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-orange-500" /> Featured
          </div>
          <h2 className="mt-4 font-extrabold text-4xl sm:text-5xl">Trending now</h2>
          <p className="mt-3 text-muted-foreground">Hand-picked hackathons you don't want to miss.</p>
        </div>
        <Link href="/explore" className="inline-flex items-center gap-1 text-sm font-semibold hover:text-violet-600 transition-colors">
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {plain.map((h) => (
          <HackathonCard key={h.id} h={h} />
        ))}
      </div>
    </section>
  );
}
