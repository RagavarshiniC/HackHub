import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Trophy, Sparkles, Rocket, Bookmark } from 'lucide-react';
import { HACKATHONS } from '../data/mock';
import HackathonCard from '../components/HackathonCard';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';

const ContestantDashboard = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login/contestant" />;

  const recommended = HACKATHONS.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-violet-500 font-semibold">
            Contestant dashboard
          </div>
          <h1 className="mt-1 text-3xl md:text-4xl font-extrabold">Hey {user.name} <span aria-hidden>{'👋'}</span></h1>
          <p className="mt-1 text-muted-foreground">
            Your hackathon journey, all in one place.
          </p>
        </div>
        <Button asChild className="brand-gradient-bg text-white rounded-full h-11 px-6">
          <Link to="/explore">
            <Sparkles className="w-4 h-4 mr-2" /> Explore hackathons
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Rocket} title="Registered" value="3" hint="Upcoming events" />
        <StatCard icon={Trophy} title="Wins" value="1" hint="AI For Good ’ 24" />
        <StatCard icon={Bookmark} title="Saved" value="7" hint="Watchlist events" />
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold">Recommended for you</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((h) => (
            <HackathonCard key={h.id} h={h} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, hint }) => (
  <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
    <div className="w-11 h-11 rounded-xl brand-gradient-bg flex items-center justify-center">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <div className="text-xs text-muted-foreground uppercase tracking-widest">{title}</div>
      <div className="text-xl font-bold mt-0.5">{value}</div>
      <div className="text-xs text-muted-foreground">{hint}</div>
    </div>
  </div>
);

export default ContestantDashboard;
