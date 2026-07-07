import React from 'react';
import { TESTIMONIALS } from '../data/mock';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
          Loved by builders
        </div>
        <h2 className="mt-4 font-extrabold text-4xl sm:text-5xl">
          Stories from the <span className="brand-gradient-text">winners</span>.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="card-hover rounded-2xl border border-border bg-card p-6">
            <Quote className="w-6 h-6 text-violet-400" />
            <p className="mt-4 text-foreground/90 leading-relaxed">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full brand-gradient-bg text-white text-sm font-bold flex items-center justify-center">
                {t.avatar}
              </span>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
