import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { STATS } from '../data/mock';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Halos */}
      <div className="hero-halo -left-24 top-10 w-96 h-96 bg-violet-500/40" />
      <div className="hero-halo right-0 top-40 w-[28rem] h-[28rem] bg-fuchsia-400/30" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24">
        <div className="flex flex-col items-center text-center gap-8 animate-fade-up">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-4 py-1.5 text-sm text-foreground hover:border-violet-300 transition-colors"
          >
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Season 2025 is live —
            </span>
            <span className="font-semibold text-violet-600 dark:text-violet-400">
              ₹2Cr+ in prizes
            </span>
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
            <Button
              asChild
              className="brand-gradient-bg text-white hover:opacity-95 rounded-full h-12 px-7 text-base shadow-lg shadow-violet-500/25"
            >
              <Link to="/explore">
                Explore hackathons
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full h-12 px-7 text-base border-border hover:bg-secondary"
            >
              <Link to="/login/contestant">Join as contestant</Link>
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-8 sm:gap-16 w-full max-w-2xl">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-extrabold brand-gradient-text">
                  {s.value}
                </div>
                <div className="mt-2 text-[11px] tracking-[0.18em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
