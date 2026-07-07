import { TIMELINE } from '@/lib/mock';

export default function TimelineSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            How it works
          </div>
          <h2 className="mt-5 font-extrabold text-4xl sm:text-5xl leading-tight">
            From spark to <span className="brand-gradient-text">shipped</span> — in 4 steps.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            HackHub compresses months of product work into a single weekend. Here is the journey most winners follow.
          </p>
        </div>

        <div className="relative pl-6">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/60 via-fuchsia-400/50 to-transparent" />
          <div className="space-y-8">
            {TIMELINE.map((t) => (
              <div key={t.step} className="relative">
                <span className="absolute -left-[26px] top-1.5 w-4 h-4 rounded-full brand-gradient-bg ring-4 ring-background" />
                <div className="text-xs font-semibold tracking-widest text-violet-500">STEP {t.step}</div>
                <h4 className="mt-1 text-xl font-bold">{t.title}</h4>
                <p className="mt-1 text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
