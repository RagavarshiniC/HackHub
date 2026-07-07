import React from 'react';
import * as Icons from 'lucide-react';
import { FEATURES } from '../data/mock';

const FeaturesGrid = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
          <Icons.Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Built for builders
        </div>
        <h2 className="mt-5 font-extrabold text-4xl sm:text-5xl leading-tight">
          Everything you need to <span className="brand-gradient-text">hack</span>,
          <br /> ship, and win.
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          A modern platform designed for both organizers and contestants.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f) => {
          const Icon = Icons[f.icon] || Icons.Sparkles;
          return (
            <div
              key={f.title}
              className="card-hover rounded-2xl border border-border bg-card p-6"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-md`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesGrid;
