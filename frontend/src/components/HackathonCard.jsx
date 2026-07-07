import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trophy, ArrowRight, MapPin, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const HackathonCard = ({ h }) => {
  return (
    <div className="card-hover rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <img
          src={h.image}
          alt={h.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute top-3 right-3 bg-background/95 text-foreground hover:bg-background border-0 shadow-sm">
          {h.category}
        </Badge>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-bold leading-tight">{h.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{h.description}</p>

        <div className="mt-1 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {h.date}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="truncate max-w-[160px]">{h.prizeShort || h.prize}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {h.mode}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {h.participants.toLocaleString()} joined
          </span>
        </div>

        <div className="mt-auto pt-3">
          <Button
            asChild
            className="w-full brand-gradient-bg text-white hover:opacity-95 rounded-lg"
          >
            <Link to={`/hackathon/${h.id}`}>
              View details
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
