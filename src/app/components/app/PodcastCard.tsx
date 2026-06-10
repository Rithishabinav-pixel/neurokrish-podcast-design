import { Clock, Calendar, Mic } from "lucide-react";
import type { Episode } from "./podcast-data";
import { Badge } from "../ui/badge";
import { PlatformBar } from "./PlatformIcons";

export function PodcastCard({
  episode,
  onOpen,
}: {
  episode: Episode;
  onOpen: (id: string) => void;
}) {
  return (
    <article
      onClick={() => onOpen(episode.id)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${episode.accent}`}
        />
        <img
          src={episode.cover}
          alt=""
          className="h-full w-full object-cover mix-blend-overlay opacity-90 transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Badge className="bg-white/90 text-foreground backdrop-blur hover:bg-white">
            {episode.category}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white/90">
          <span className="flex items-center gap-1.5 text-xs">
            <Calendar className="h-3.5 w-3.5" />
            {episode.date}
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <Clock className="h-3.5 w-3.5" />
            {episode.duration}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Mic className="h-3.5 w-3.5" />
          {episode.guest}
        </div>
        <h3 className="mb-2 line-clamp-2 leading-snug">{episode.title}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {episode.short}
        </p>
        <div className="flex items-center justify-between border-t border-border pt-4">
          <PlatformBar links={episode.links} />
          <span className="text-xs text-muted-foreground transition group-hover:text-foreground">
            Listen →
          </span>
        </div>
      </div>
    </article>
  );
}
