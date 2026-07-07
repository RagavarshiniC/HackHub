'use client';

import { useState, useTransition } from 'react';
import { ArrowRight } from 'lucide-react';
import { registerForHackathon } from '@/lib/actions';

export default function RegisterButton({ hackathonId }) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState(null);

  const handleClick = () => {
    start(async () => {
      const res = await registerForHackathon(hackathonId);
      if (res?.error) setMsg({ ok: false, text: res.error });
      else setMsg({ ok: true, text: 'Registered successfully.' });
    });
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleClick}
        disabled={pending}
        className="w-full h-11 brand-gradient-bg text-white rounded-lg inline-flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {pending ? 'Registering...' : 'Register now'}
        <ArrowRight className="w-4 h-4" />
      </button>
      {msg && (
        <p className={`mt-2 text-sm ${msg.ok ? 'text-emerald-600' : 'text-red-500'}`}>{msg.text}</p>
      )}
    </div>
  );
}
