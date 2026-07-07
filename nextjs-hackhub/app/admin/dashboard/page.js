import Link from 'next/link';
import { PlusCircle, Users, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Admin dashboard' };

// Re-fetch fresh data on every request so newly-created hackathons show up.
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await auth();
  const user = session?.user;

  const hackathons = await prisma.hackathon.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8,
  });

  const totalParticipants = await prisma.registration.count().catch(() => 0);

  const stats = [
    { icon: Calendar, label: 'Events hosted', value: hackathons.length.toString(), color: 'from-violet-500 to-indigo-500' },
    { icon: Users, label: 'Total participants', value: totalParticipants.toLocaleString(), color: 'from-fuchsia-500 to-pink-500' },
    { icon: Trophy, label: 'Prizes awarded', value: '₹18.5L', color: 'from-amber-500 to-orange-500' },
    { icon: TrendingUp, label: 'Avg satisfaction', value: '4.8/5', color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-violet-500 font-semibold">
            Admin dashboard
          </div>
          <h1 className="mt-1 text-3xl md:text-4xl font-extrabold">
            Welcome, {user?.name || user?.email} <span aria-hidden>{'\u2728'}</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here is what is happening across your events.
          </p>
        </div>
        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full brand-gradient-bg text-white shadow-md shadow-violet-500/20 hover:opacity-95"
        >
          <PlusCircle className="w-4 h-4" /> Host a new hackathon
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-5">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div className="mt-4 text-2xl font-extrabold">{s.value}</div>
            <div className="text-xs text-muted-foreground tracking-wide mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold">Your events</h2>
        <div className="mt-4 rounded-2xl border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-muted-foreground uppercase text-xs tracking-widest">
              <tr>
                <th className="text-left px-5 py-3">Event</th>
                <th className="text-left px-5 py-3">Date</th>
                <th className="text-left px-5 py-3">Mode</th>
                <th className="text-left px-5 py-3">Participants</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {hackathons.map((h) => (
                <tr key={h.id} className="border-t">
                  <td className="px-5 py-4 font-medium">{h.title}</td>
                  <td className="px-5 py-4 text-muted-foreground">{h.date.toISOString().slice(0, 10)}</td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-1 rounded bg-secondary text-xs">{h.mode}</span>
                  </td>
                  <td className="px-5 py-4">{h.participants.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/hackathon/${h.slug}`} className="text-sm font-semibold text-violet-600 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
