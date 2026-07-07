import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Trophy, Users, MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import RegisterButton from '@/components/RegisterButton';

// Static generation for known hackathons
export async function generateStaticParams() {
  try {
    const list = await prisma.hackathon.findMany({ select: { slug: true } });
    return list.map((h) => ({ slug: h.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const h = await prisma.hackathon.findUnique({ where: { slug: params.slug } });
  if (!h) return { title: 'Hackathon not found' };
  return { title: h.title, description: h.description };
}

export const revalidate = 300;

export default async function HackathonDetail({ params }) {
  const h = await prisma.hackathon.findUnique({
    where: { slug: params.slug },
    include: { organizer: true },
  });

  if (!h) notFound();

  const tags = h.tags ? h.tags.split(',') : [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link href="/explore" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> Back to explore
      </Link>

      <div className="mt-6 rounded-3xl overflow-hidden border">
        <div className="relative h-72">
          <Image src={h.image} alt={h.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white text-black">
              {h.category}
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">{h.title}</h1>
            <p className="mt-2 text-white/80 max-w-2xl">{h.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold">About this event</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Join {h.participants.toLocaleString()} builders in a {h.mode.toLowerCase()} format
              hosted by {h.organizer?.name || 'HackHub'}. Ship something meaningful, meet future
              collaborators, and compete for prizes worth {h.prize}.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold">Tracks</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-secondary text-sm">{t}</span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold">What you will get</h3>
            <ul className="mt-3 space-y-2">
              {[
                'Access to mentors and office hours',
                'Cloud credits for your team',
                'Networking with sponsors and recruiters',
                'Chance to win career-changing prizes',
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" /> {x}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border bg-card p-6">
            <div className="space-y-3 text-sm">
              <Row icon={Calendar} label="Starts" value={h.date.toISOString().slice(0, 10)} />
              <Row icon={Calendar} label="Ends" value={h.endDate.toISOString().slice(0, 10)} />
              <Row icon={MapPin} label="Mode" value={`${h.mode} • ${h.location}`} />
              <Row icon={Trophy} label="Prizes" value={h.prize} />
              <Row icon={Users} label="Participants" value={h.participants.toLocaleString()} />
            </div>
            <RegisterButton hackathonId={h.id} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 mt-0.5 text-muted-foreground" />
      <div className="flex-1 flex items-center justify-between gap-3">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-right">{value}</span>
      </div>
    </div>
  );
}
