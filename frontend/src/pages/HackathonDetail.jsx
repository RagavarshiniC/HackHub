import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Trophy, Users, MapPin, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HACKATHONS } from '../data/mock';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';
import { useAuth } from '../contexts/AuthContext';

const HackathonDetail = () => {
  const { id } = useParams();
  const h = HACKATHONS.find((x) => x.id === id);
  const { user } = useAuth();

  if (!h) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">Hackathon not found</h1>
        <p className="mt-2 text-muted-foreground">The event you are looking for does not exist.</p>
        <Button asChild className="mt-6">
          <Link to="/explore">Back to explore</Link>
        </Button>
      </div>
    );
  }

  const register = () => {
    toast({
      title: user ? 'Registered successfully' : 'Please sign in',
      description: user
        ? `You are now registered for ${h.title}.`
        : 'Contestants must sign in to register.',
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Toaster />
      <Link
        to="/explore"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to explore
      </Link>

      <div className="mt-6 rounded-3xl overflow-hidden border border-border">
        <div className="relative h-72">
          <img src={h.image} alt={h.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <Badge className="bg-white text-black hover:bg-white">{h.category}</Badge>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">{h.title}</h1>
            <p className="mt-2 text-white/80 max-w-2xl">{h.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold">About this event</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Join {h.participants.toLocaleString()} builders in a {h.mode.toLowerCase()} format
              hosted by {h.organizer}. Ship something meaningful, meet future collaborators, and
              compete for prizes worth {h.prize}.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold">Tracks</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {h.tags.map((t) => (
                <Badge key={t} className="bg-secondary text-foreground hover:bg-secondary">{t}</Badge>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold">What you will get</h3>
            <ul className="mt-3 space-y-2">
              {[
                'Access to mentors and office hours',
                'Cloud credits for your team',
                'Networking with sponsors and recruiters',
                'Chance to win career-changing prizes',
              ].map((x) => (
                <li key={x} className="flex items-start gap-2 text-foreground/90">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" /> {x}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="space-y-3 text-sm">
              <Row icon={Calendar} label="Starts" value={h.date} />
              <Row icon={Calendar} label="Ends" value={h.endDate} />
              <Row icon={MapPin} label="Mode" value={`${h.mode} • ${h.location}`} />
              <Row icon={Trophy} label="Prizes" value={h.prize} />
              <Row icon={Users} label="Participants" value={h.participants.toLocaleString()} />
            </div>
            <Button
              onClick={register}
              className="mt-6 w-full h-11 brand-gradient-bg text-white rounded-lg"
            >
              Register now <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Hosted by
            </div>
            <div className="mt-2 text-lg font-bold">{h.organizer}</div>
            <p className="mt-1 text-sm text-muted-foreground">Verified organizer on HackHub.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

const Row = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-4 h-4 mt-0.5 text-muted-foreground" />
    <div className="flex-1 flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  </div>
);

export default HackathonDetail;
