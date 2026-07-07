import { Rocket, Users, Trophy, ShieldCheck, Sparkles, Heart } from 'lucide-react';

export const metadata = { title: 'About HackHub' };

const VALUES = [
  { icon: Rocket, title: 'Builder first', body: 'Every decision we make is optimized for the builder experience.' },
  { icon: Users, title: 'Community over competition', body: 'Hackathons are a team sport — collaboration always wins.' },
  { icon: Trophy, title: 'Real outcomes', body: 'Not just t-shirts — careers, funding, and lifelong friendships.' },
  { icon: ShieldCheck, title: 'Fair & transparent', body: 'Every judgement is documented and open for review.' },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
          <Heart className="w-3.5 h-3.5 text-rose-500" /> About HackHub
        </div>
        <h1 className="mt-4 font-extrabold text-4xl sm:text-6xl leading-tight">
          We build the <span className="brand-gradient-text">stage</span>.<br />
          You build the future.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          HackHub started in a college hostel in 2023 with a simple idea: hackathons should feel
          like launching a rocket — fast, thrilling, and full of possibility. Today we host
          hundreds of events across 90 countries and power thousands of career moments every year.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-2xl border bg-card p-8 card-hover">
            <div className="w-12 h-12 rounded-xl brand-gradient-bg flex items-center justify-center">
              <v.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="mt-5 text-2xl font-bold">{v.title}</h3>
            <p className="mt-2 text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/40 dark:to-fuchsia-950/20 p-10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-background border flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-violet-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Our mission</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed max-w-3xl">
              To make the internet the most level playing field in history — where anyone with
              curiosity, hustle, and a laptop can ship, compete, and win.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
