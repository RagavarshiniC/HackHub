import Link from 'next/link';
import { Rocket, Trophy, Sparkles, Bookmark } from 'lucide-react';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import HackathonCard from '@/components/HackathonCard';

export const metadata = { title: 'Your dashboard' };

export default async function DashboardPage() {
  const session = await auth();
  // Middleware guarantees session, but we double-check.
  const user = session?.user;

  const recommended = await prisma.hackathon.findMany({
    orderBy: { date: 'asc' },
    take: 3,
  });

  const plain = recommended.map((h) => ({
    ...h,
    date: h.date.toISOString().slice(0, 10),
    tags: h.tags ? h.tags.split(',') : [],
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-violet-500 font-semibold">
            Contestant dashboard
          </div>
          <h1 className="mt-1 text-3xl md:text-4xl font-extrabold">
            Hey {user?.name || user?.email} <span aria-hidden>{'\u{1F44B}'}</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Your hackathon journey, all in one place.
          </p>
        </div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full brand-gradient-bg text-white"
        >
          <Sparkles className="w-4 h-4" /> Explore hackathons
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Rocket} title="Registered" value="3" hint="Upcoming events" />
        <StatCard icon={Trophy} title="Wins" value="1" hint="AI For Good 24" />
        <StatCard icon={Bookmark} title="Saved" value="7" hint="Watchlist events" />
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold">Recommended for you</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plain.map((h) => (
            <HackathonCard key={h.id} h={h} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, hint }) {
  return (
    <div className="rounded-2xl border bg-card p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl brand-gradient-bg flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest">{title}</div>
        <div className="text-xl font-bold mt-0.5">{value}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
    </div>
  );
}
