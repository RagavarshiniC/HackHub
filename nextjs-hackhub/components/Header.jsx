'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Code2, Menu, X, LogOut, ChevronDown } from 'lucide-react';

const NAV = [
  { to: '/explore', label: 'Explore' },
  { to: '/about', label: 'About' },
  { to: '/support', label: 'Support' },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl brand-gradient-bg flex items-center justify-center shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5 text-white" />
          </span>
          <span className="font-extrabold text-lg tracking-tight">
            <span>Hack</span>
            <span className="brand-gradient-text">Hub</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center nav-pill px-2 py-1.5 gap-1">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  active ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {!user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login/contestant" className="text-sm font-medium hover:text-violet-600">
                Contestant
              </Link>
              <Link
                href="/login/admin"
                className="brand-gradient-bg text-white rounded-full px-5 h-9 flex items-center text-sm font-medium shadow-md shadow-violet-500/20"
              >
                Admin
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 pl-1 pr-3 h-9 rounded-full border hover:bg-secondary"
              >
                <span className="w-7 h-7 rounded-full brand-gradient-bg text-white text-xs font-semibold flex items-center justify-center">
                  {(user.name || user.email || '?').slice(0, 2).toUpperCase()}
                </span>
                <span className="hidden sm:inline text-sm font-medium">{user.name || user.email}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {menuOpen && (
                <div
                  onMouseLeave={() => setMenuOpen(false)}
                  className="absolute right-0 mt-2 w-56 rounded-xl border bg-card shadow-lg overflow-hidden"
                >
                  <div className="p-3 border-b">
                    <div className="text-sm font-semibold">{user.name || user.email}</div>
                    <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                    <div className="text-[10px] mt-1 uppercase tracking-wide text-violet-500 font-semibold">
                      {user.role || 'contestant'}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      router.push(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-secondary"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-secondary flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="px-6 py-4 flex flex-col gap-2">
            {NAV.map((item) => (
              <Link key={item.to} href={item.to} onClick={() => setOpen(false)} className="py-2 text-sm font-medium">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
