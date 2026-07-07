'use client';

import { useState } from 'react';
import { Mail, MessageCircle, LifeBuoy, ChevronDown } from 'lucide-react';
import { FAQS } from '@/lib/mock';

export default function SupportClient() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [openIdx, setOpenIdx] = useState(0);
  const [status, setStatus] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ ok: false, msg: 'Please fill in all fields.' });
      return;
    }
    setStatus({ ok: true, msg: 'Message sent — we will get back within 24 hours.' });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
          <LifeBuoy className="w-3.5 h-3.5 text-violet-500" /> Support
        </div>
        <h1 className="mt-4 font-extrabold text-4xl sm:text-5xl leading-tight">
          We are here to <span className="brand-gradient-text">help</span>.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Browse the FAQ or drop us a note — we respond within 24 hours.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={f.q} className="rounded-2xl border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  className="w-full flex items-center justify-between text-left px-5 py-4"
                >
                  <span className="font-semibold">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</div>}
              </div>
            );
          })}
        </div>

        <form onSubmit={submit} className="rounded-2xl border bg-card p-6 space-y-4 h-fit">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              className="mt-1.5 w-full h-11 rounded-lg border bg-background px-3 outline-none focus:border-violet-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1.5 w-full h-11 rounded-lg border bg-background px-3 outline-none focus:border-violet-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jane@company.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              className="mt-1.5 min-h-[140px] w-full rounded-lg border bg-background px-3 py-2 outline-none focus:border-violet-500"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="How can we help?"
            />
          </div>
          <button type="submit" className="w-full brand-gradient-bg text-white rounded-lg h-11 inline-flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> Send message
          </button>
          {status && (
            <div className={`text-sm ${status.ok ? 'text-emerald-600' : 'text-red-500'}`}>{status.msg}</div>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
            <MessageCircle className="w-3.5 h-3.5" /> Or email hello@hackhub.dev directly.
          </div>
        </form>
      </div>
    </div>
  );
}
