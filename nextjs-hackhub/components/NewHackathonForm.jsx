'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { ArrowLeft, PlusCircle, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { createHackathon } from '@/lib/actions';

const CATEGORIES = ['AI/ML', 'Web3', 'DevOps', 'FinTech', 'Design', 'ClimateTech', 'Gaming', 'HealthTech', 'Other'];
const MODES = ['Online', 'Hybrid', 'In-person'];
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80';

export default function NewHackathonForm() {
  const [state, formAction] = useFormState(createHackathon, {});
  const [imagePreview, setImagePreview] = useState(DEFAULT_IMAGE);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <div className="mt-6">
        <div className="text-xs uppercase tracking-widest text-violet-500 font-semibold">
          Admin \u00b7 New event
        </div>
        <h1 className="mt-1 text-3xl md:text-4xl font-extrabold">
          Host a <span className="brand-gradient-text">new hackathon</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Fill in the details \u2014 you can edit them anytime after publishing.
        </p>
      </div>

      {state?.error && (
        <div className="mt-6 flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 dark:bg-red-950/30 dark:border-red-900 p-4 text-sm text-red-700 dark:text-red-300">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <form action={formAction} className="mt-8 space-y-6">
        <Section title="Basics">
          <Field label="Event title" htmlFor="title">
            <input
              id="title"
              name="title"
              required
              placeholder="e.g. Global AI Weekend 2025"
              className="input"
            />
          </Field>

          <Field label="Short description" htmlFor="description">
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              placeholder="What the event is about \u2014 one sentence works."
              className="input min-h-[96px]"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Category" htmlFor="category">
              <select id="category" name="category" required defaultValue="" className="input">
                <option value="" disabled>Select category</option>
                {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </Field>
            <Field label="Mode" htmlFor="mode">
              <select id="mode" name="mode" required defaultValue="" className="input">
                <option value="" disabled>Select mode</option>
                {MODES.map((m) => (<option key={m} value={m}>{m}</option>))}
              </select>
            </Field>
          </div>

          <Field label="Location" htmlFor="location">
            <input
              id="location"
              name="location"
              required
              placeholder="e.g. Bengaluru, IN  \u00b7  or  \u201cOnline\u201d"
              className="input"
            />
          </Field>
        </Section>

        <Section title="Schedule & prizes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Start date" htmlFor="date">
              <input id="date" name="date" type="date" required className="input" />
            </Field>
            <Field label="End date" htmlFor="endDate">
              <input id="endDate" name="endDate" type="date" required className="input" />
            </Field>
          </div>

          <Field label="Prize summary" htmlFor="prize">
            <input
              id="prize"
              name="prize"
              required
              placeholder="e.g. \u20B95,00,000 + Internships"
              className="input"
            />
          </Field>

          <Field label="Tags (comma-separated)" htmlFor="tags">
            <input
              id="tags"
              name="tags"
              placeholder="AI, LLM, RAG"
              className="input"
            />
          </Field>
        </Section>

        <Section title="Cover image">
          <Field label="Image URL" htmlFor="image">
            <input
              id="image"
              name="image"
              type="url"
              required
              defaultValue={DEFAULT_IMAGE}
              onChange={(e) => setImagePreview(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="input"
            />
          </Field>

          <div className="mt-2 relative rounded-xl overflow-hidden border bg-secondary/40 h-48">
            {imagePreview ? (
              // Using plain <img> so any URL renders (next/image needs configured domains)
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={imagePreview} alt="Cover preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
          </div>

          <label className="mt-3 flex items-center gap-2 text-sm select-none cursor-pointer">
            <input type="checkbox" name="featured" className="w-4 h-4 rounded border-border accent-violet-600" />
            Feature this event on the home page
          </label>
        </Section>

        <div className="flex items-center gap-3 pt-2">
          <SubmitButton />
          <Link href="/admin/dashboard" className="h-11 px-6 rounded-full border inline-flex items-center hover:bg-secondary">
            Cancel
          </Link>
        </div>
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          height: 44px;
          padding: 0 12px;
          border-radius: 10px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          outline: none;
        }
        textarea.input {
          padding: 10px 12px;
          height: auto;
        }
        .input:focus {
          border-color: hsl(258, 90%, 66%);
          box-shadow: 0 0 0 3px hsla(258, 90%, 66%, 0.15);
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
        {title}
      </h3>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-11 px-6 rounded-full brand-gradient-bg text-white inline-flex items-center gap-2 disabled:opacity-70"
    >
      <PlusCircle className="w-4 h-4" />
      {pending ? 'Creating...' : 'Publish hackathon'}
    </button>
  );
}
