'use client';
import { Code2, Brain, Sparkles, Zap, Cpu, Rocket } from 'lucide-react';

export default function RocketShowcase() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl border">
        <div
          className="relative h-[520px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.35) 0%, rgba(30,10,60,1) 55%, rgba(10,4,25,1) 100%)' }}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 53) % 100}%`,
                width: `${(i % 3) + 1}px`,
                height: `${(i % 3) + 1}px`,
                animationDelay: `${(i % 5) * 0.4}s`,
              }}
            />
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[520px] h-[520px] rounded-full border border-white/10 animate-spin-slow">
              <FloatIcon Icon={Code2} className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" bg="from-sky-500 to-blue-500" />
              <FloatIcon Icon={Brain} className="top-16 right-4 translate-x-1/2" bg="from-fuchsia-500 to-purple-500" />
              <FloatIcon Icon={Zap} className="top-1/2 right-0 -translate-y-1/2 translate-x-1/2" bg="from-amber-500 to-orange-500" />
              <FloatIcon Icon={Cpu} className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" bg="from-emerald-500 to-teal-500" />
              <FloatIcon Icon={Sparkles} className="top-1/2 left-0 -translate-y-1/2 -translate-x-1/2" bg="from-pink-500 to-rose-500" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative animate-float-slow">
              <div className="w-24 h-40 relative">
                <div className="absolute inset-x-2 top-0 h-28 bg-gradient-to-b from-white to-slate-300 rounded-t-full" />
                <div className="absolute inset-x-0 top-6 flex justify-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500 ring-4 ring-slate-200" />
                </div>
                <div className="absolute -left-3 bottom-8 w-6 h-10 bg-pink-500 skew-y-12 rounded-b-md" />
                <div className="absolute -right-3 bottom-8 w-6 h-10 bg-pink-500 -skew-y-12 rounded-b-md" />
                <div className="absolute inset-x-6 bottom-6 h-4 bg-amber-500 rounded-b-md" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 border border-white/15 text-white/90 text-sm">
              <Rocket className="w-4 h-4" /> Ship. Learn. Win.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatIcon({ Icon, className, bg }) {
  return (
    <div className={`absolute w-14 h-14 rounded-2xl bg-gradient-to-br ${bg} shadow-lg flex items-center justify-center animate-float-med ${className}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  );
}
