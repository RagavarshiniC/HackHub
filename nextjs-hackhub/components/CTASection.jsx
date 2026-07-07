import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/40 dark:to-fuchsia-950/30 p-10 md:p-16">
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute -left-10 -bottom-16 w-72 h-72 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-extrabold text-4xl md:text-5xl leading-tight">
              Ready to build the <span className="brand-gradient-text">next big thing</span>?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-lg">
              Whether you are hosting or hacking — HackHub gives you the tools, community, and stage to make it real.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <Link href="/login/contestant" className="brand-gradient-bg text-white rounded-full h-12 px-7 inline-flex items-center gap-2">
              Start as contestant <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login/admin" className="rounded-full h-12 px-7 border bg-background inline-flex items-center">
              Host a hackathon
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
