import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Code2, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

const NAV = [
  { to: '/explore', label: 'Explore' },
  { to: '/about', label: 'About' },
  { to: '/support', label: 'Support' },
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl brand-gradient-bg flex items-center justify-center shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5 text-white" />
          </span>
          <span className="font-extrabold text-lg tracking-tight">
            <span className="text-foreground">Hack</span>
            <span className="brand-gradient-text">Hub</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center nav-pill px-2 py-1.5 gap-1">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </NavLink>
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
              <Link
                to="/login/contestant"
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                Contestant
              </Link>
              <Button
                asChild
                className="brand-gradient-bg text-white hover:opacity-90 rounded-full px-5 h-9 shadow-md shadow-violet-500/20"
              >
                <Link to="/login/admin">Admin</Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-1 pr-3 h-9 rounded-full border border-border hover:bg-secondary transition-colors">
                  <span className="w-7 h-7 rounded-full brand-gradient-bg text-white text-xs font-semibold flex items-center justify-center">
                    {user.avatar}
                  </span>
                  <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                    <span className="text-[10px] mt-1 uppercase tracking-wide text-violet-500 font-semibold">
                      {user.role}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard')
                  }
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/explore')}>
                  Explore hackathons
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                  <LogOut className="w-4 h-4 mr-2" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-2">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium"
              >
                {item.label}
              </NavLink>
            ))}
            {!user && (
              <div className="flex gap-2 pt-2">
                <Button asChild variant="outline" className="flex-1 rounded-full">
                  <Link to="/login/contestant" onClick={() => setOpen(false)}>Contestant</Link>
                </Button>
                <Button asChild className="flex-1 brand-gradient-bg text-white rounded-full">
                  <Link to="/login/admin" onClick={() => setOpen(false)}>Admin</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
