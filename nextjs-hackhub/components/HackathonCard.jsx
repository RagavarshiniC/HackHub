import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Trophy, ArrowRight, MapPin, Users } from 'lucide-react';

export default function HackathonCard({ h }) {
  const tags = Array.isArray(h.tags) ? h.tags : (h.tags ? h.tags.split(',') : []);
  return (
    <div className="card-hover rounded-2xl border bg-card overflow-hidden flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <Image src={h.image} alt={h.title} fill sizes="400px" className="object-cover" />
        <span className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-background/95 shadow-sm">
          {h.category}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-bold leading-tight">{h.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{h.description}</p>

        <div className="mt-1 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="w-4 h-4" /> {h.date}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="truncate max-w-[160px]">{h.prize}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {h.mode}</span>
          <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {h.participants.toLocaleString()} joined</span>
        </div>

        <div className="mt-auto pt-3">
          <Link
            href={`/hackathon/${h.slug}`}
            className="w-full brand-gradient-bg text-white rounded-lg h-10 flex items-center justify-center gap-1.5"
          >
            View details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
