import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { STATS } from '@/lib/mock';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-halo -left-24 top-10 w-96 h-96 bg-violet-500/40" />
      <div className="hero-halo right-0 top-40 w-[28rem] h-[28rem] bg-fuchsia-400/30" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24">
        <div className="flex flex-col items-center text-center gap-8 animate-fade-up">
          <Link href="/explore" className="inline-flex items-center gap-2 rounded-full border bg-background/70 backdrop-blur px-4 py-1.5 text-sm hover:border-violet-300 transition-colors">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Season 2025 is live —
            </span>
            <span className="font-semibold text-violet-600 dark:text-violet-400">₹2Cr+ in prizes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <h1 className="font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.05] max-w-4xl">
            Where <span className="brand-gradient-text">innovators</span>
            <br /> ship the future.
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            HackHub is the platform where organizers host world-class hackathons and developers,
            designers, and dreamers turn ideas into reality — in a weekend.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href="/explore"
              className="brand-gradient-bg text-white hover:opacity-95 rounded-full h-12 px-7 text-base shadow-lg shadow-violet-500/25 inline-flex items-center gap-2"
            >
              Explore hackathons
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login/contestant"
              className="rounded-full h-12 px-7 text-base border bg-background hover:bg-secondary inline-flex items-center"
            >
              Join as contestant
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-8 sm:gap-16 w-full max-w-2xl">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-extrabold brand-gradient-text">{s.value}</div>
                <div className="mt-2 text-[11px] tracking-[0.18em] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
