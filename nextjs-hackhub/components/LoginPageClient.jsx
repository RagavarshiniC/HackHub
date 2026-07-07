'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ArrowLeft, ShieldCheck, User, Github, Mail, Eye, EyeOff } from 'lucide-react';
import { signupAction } from '@/lib/actions';

export default function LoginPageClient({ role }) {
  const isAdmin = role === 'admin';
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || (isAdmin ? '/admin/dashboard' : '/dashboard');

  const [mode, setMode] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState(null);
  const [pending, startTransition] = useTransition();
  const [creds, setCreds] = useState({ name: '', email: '', password: '' });

  const oauth = (provider) => {
    signIn(provider, { callbackUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (mode === 'login') {
      const res = await signIn('credentials', {
        email: creds.email,
        password: creds.password,
        role,
        redirect: false,
        callbackUrl,
      });
      if (res?.error) {
        setErr('Invalid credentials or role.');
      } else if (res?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } else {
      startTransition(async () => {
        const fd = new FormData();
        fd.set('name', creds.name);
        fd.set('email', creds.email);
        fd.set('password', creds.password);
        fd.set('role', role);
        const res = await signupAction(fd);
        if (res?.error) setErr(res.error);
      });
    }
  };

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
      <div className="hero-halo -left-24 top-0 w-96 h-96 bg-violet-500/30" />
      <div className="hero-halo right-0 top-40 w-[24rem] h-[24rem] bg-fuchsia-400/20" />

      <div className="relative mx-auto max-w-md px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="mt-6 rounded-2xl border bg-card p-8 shadow-lg shadow-violet-500/5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl brand-gradient-bg flex items-center justify-center">
              {isAdmin ? <ShieldCheck className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-violet-500 font-semibold">
                {isAdmin ? 'Admin portal' : 'Contestant portal'}
              </div>
              <h1 className="text-2xl font-bold">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h1>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => oauth('google')} className="h-11 border rounded-lg inline-flex items-center justify-center gap-2 hover:bg-secondary">
              <GoogleIcon className="w-4 h-4" /> Google
            </button>
            <button type="button" onClick={() => oauth('github')} className="h-11 border rounded-lg inline-flex items-center justify-center gap-2 hover:bg-secondary">
              <Github className="w-4 h-4" /> GitHub
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 mb-4 rounded-lg bg-secondary p-1 text-sm">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setErr(null); }}
                className={`py-2 rounded-md font-medium ${mode === m ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
              >
                {m === 'login' ? 'Log in' : 'Sign up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <Field label="Full name">
                <input
                  value={creds.name}
                  onChange={(e) => setCreds({ ...creds, name: e.target.value })}
                  placeholder="Alex Kim"
                  className="h-11 w-full rounded-lg border bg-background px-3 outline-none focus:border-violet-500"
                />
              </Field>
            )}
            <Field label="Email">
              <input
                type="email"
                value={creds.email}
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                placeholder="you@company.com"
                className="h-11 w-full rounded-lg border bg-background px-3 outline-none focus:border-violet-500"
              />
            </Field>
            <Field label="Password">
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={creds.password}
                  onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                  placeholder="........"
                  className="h-11 w-full rounded-lg border bg-background px-3 pr-11 outline-none focus:border-violet-500"
                />
                <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </Field>

            {err && <div className="text-sm text-red-500">{err}</div>}

            <button
              type="submit"
              disabled={pending}
              className="w-full h-11 brand-gradient-bg text-white rounded-lg inline-flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <Mail className="w-4 h-4" />
              {mode === 'login' ? `Log in as ${isAdmin ? 'Admin' : 'Contestant'}` : `Create ${isAdmin ? 'Admin' : 'Contestant'} account`}
            </button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            By continuing you agree to our <a href="#" className="underline">Terms</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>

        <div className="mt-6 text-center text-sm">
          {isAdmin ? (
            <>Not an organizer? <Link href="/login/contestant" className="font-semibold text-violet-600 hover:underline">Sign in as contestant</Link></>
          ) : (
            <>Hosting an event? <Link href="/login/admin" className="font-semibold text-violet-600 hover:underline">Sign in as admin</Link></>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}
