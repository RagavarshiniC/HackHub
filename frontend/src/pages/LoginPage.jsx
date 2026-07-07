import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, User, Github, Mail, Eye, EyeOff } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { toast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';

const LoginPage = ({ role }) => {
  const isAdmin = role === 'admin';
  const { loginWithCredentials, loginWithProvider, signup } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [creds, setCreds] = useState({ name: '', email: '', password: '' });

  const handleCredentials = (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        loginWithCredentials(creds.email, creds.password, role);
      } else {
        signup({ ...creds, role });
      }
      toast({
        title: mode === 'login' ? 'Welcome back' : 'Account created',
        description: `Signed in as ${role}.`,
      });
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      toast({ title: 'Something went wrong', description: err.message });
    }
  };

  const handleProvider = (provider) => {
    loginWithProvider(provider, role);
    toast({ title: 'Signed in', description: `via ${provider}` });
    navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
  };

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
      <Toaster />
      <div className="hero-halo -left-24 top-0 w-96 h-96 bg-violet-500/30" />
      <div className="hero-halo right-0 top-40 w-[24rem] h-[24rem] bg-fuchsia-400/20" />

      <div className="relative mx-auto max-w-md px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="mt-6 rounded-2xl border border-border bg-card p-8 shadow-lg shadow-violet-500/5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl brand-gradient-bg flex items-center justify-center">
              {isAdmin ? (
                <ShieldCheck className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
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
            <Button
              type="button"
              variant="outline"
              onClick={() => handleProvider('google')}
              className="rounded-lg h-11 gap-2"
            >
              <GoogleIcon className="w-4 h-4" /> Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleProvider('github')}
              className="rounded-lg h-11 gap-2"
            >
              <Github className="w-4 h-4" /> GitHub
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Tabs value={mode} onValueChange={setMode}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Log in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleCredentials} className="space-y-4 mt-4">
                <CredentialsFields
                  creds={creds}
                  setCreds={setCreds}
                  showSignup={false}
                  showPass={showPass}
                  setShowPass={setShowPass}
                />
                <Button className="w-full h-11 brand-gradient-bg text-white rounded-lg" type="submit">
                  <Mail className="w-4 h-4 mr-2" />
                  Log in as {isAdmin ? 'Admin' : 'Contestant'}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleCredentials} className="space-y-4 mt-4">
                <CredentialsFields
                  creds={creds}
                  setCreds={setCreds}
                  showSignup
                  showPass={showPass}
                  setShowPass={setShowPass}
                />
                <Button className="w-full h-11 brand-gradient-bg text-white rounded-lg" type="submit">
                  Create {isAdmin ? 'Admin' : 'Contestant'} account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            By continuing you agree to our{' '}
            <a href="#" className="underline">Terms</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>

        <div className="mt-6 text-center text-sm">
          {isAdmin ? (
            <>
              Not an organizer?{' '}
              <Link to="/login/contestant" className="font-semibold text-violet-600 hover:underline">
                Sign in as contestant
              </Link>
            </>
          ) : (
            <>
              Hosting an event?{' '}
              <Link to="/login/admin" className="font-semibold text-violet-600 hover:underline">
                Sign in as admin
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CredentialsFields = ({ creds, setCreds, showSignup, showPass, setShowPass }) => (
  <>
    {showSignup && (
      <div>
        <Label>Full name</Label>
        <Input
          value={creds.name}
          onChange={(e) => setCreds({ ...creds, name: e.target.value })}
          placeholder="Alex Kim"
          className="mt-1.5 h-11"
        />
      </div>
    )}
    <div>
      <Label>Email</Label>
      <Input
        type="email"
        value={creds.email}
        onChange={(e) => setCreds({ ...creds, email: e.target.value })}
        placeholder="you@company.com"
        className="mt-1.5 h-11"
      />
    </div>
    <div>
      <Label>Password</Label>
      <div className="relative mt-1.5">
        <Input
          type={showPass ? 'text' : 'password'}
          value={creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
          placeholder="••••••••"
          className="h-11 pr-11"
        />
        <button
          type="button"
          onClick={() => setShowPass((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Toggle password visibility"
        >
          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  </>
);

const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/>
  </svg>
);

export default LoginPage;
