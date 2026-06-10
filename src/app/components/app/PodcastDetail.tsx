import { ArrowLeft, Calendar, Clock, Mic, Share2, Bookmark, BookOpen, Play, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { episodes } from "./podcast-data";
import { PlatformBar, platforms } from "./PlatformIcons";
import { PodcastCard } from "./PodcastCard";

export function PodcastDetail({
  id,
  onBack,
  onOpen,
}: {
  id: string;
  onBack: () => void;
  onOpen: (id: string) => void;
}) {
  const episode = episodes.find((e) => e.id === id) ?? episodes[0];

  const related = episodes
    .filter((e) => e.id !== episode.id)
    .map((e) => ({
      e,
      score:
        (e.category === episode.category ? 2 : 0) +
        (Math.abs(parseInt(e.duration) - parseInt(episode.duration)) < 10
          ? 1
          : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.e);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br blue_gradient ${episode.accent}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />
        <div className="relative mx-auto max-w-5xl px-6 pb-10 pt-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-8 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            All episodes
          </Button>

          <div className="grid items-center gap-8 md:grid-cols-[280px_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${episode.accent}`}
              />
              <img
                src={episode.cover}
                alt=""
                className="h-full w-full object-cover mix-blend-overlay"
              />
            </div>
            <div>
              <Badge className="mb-3">{episode.category}</Badge>
              <h1 className="mb-4 text-balance text-3xl leading-tight tracking-tight md:text-4xl">
                {episode.title}
              </h1>
              <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Mic className="h-4 w-4" /> {episode.guest}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {episode.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {episode.duration}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <PlatformBar links={episode.links} size="md" />
                <Button variant="outline" size="sm" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[1fr_280px]">
        <article className="space-y-4 leading-relaxed text-foreground/90">
          <p className="text-muted-foreground">{episode.short}</p>
          {episode.paragraphs.slice(0, 1).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
            {/* Listen on your platform — full width below the article */}
      <section className="mx-auto max-w-5xl mt-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h3 className="tracking-tight">Listen on your platform</h3>
              <p className="text-sm text-muted-foreground">
                One link per service. Subscribe to get new episodes the morning they drop.
              </p>
            </div>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {platforms.map(({ key, label, Icon, bg, fg, ring }) => (
              <li key={key}>
                <a
                  href={episode.links[key]}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 transition hover:border-foreground/20 hover:shadow-sm"
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full ${bg} ${fg} ring-1 ${ring}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm">{label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    Open →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
        </article>

        <aside className="space-y-4 self-start rounded-2xl border border-border bg-card p-5">
          <h3 className="tracking-tight">Stay in the loop</h3>
          <p className="text-sm text-muted-foreground">
            Get new episodes, notes, and references delivered the morning they drop.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-3"
          >
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-foreground/30"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="mobile" className="text-sm">Mobile</label>
              <input
                id="mobile"
                type="tel"
                placeholder="+1 555 000 1234"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-foreground/30"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-foreground/30"
              />
            </div>
            <Button type="submit" className="w-full">Subscribe</Button>
          </form>
        </aside>
      </section>

      {/* Listen on your platform — full width below the article */}
      {/* <section className="mx-auto max-w-5xl px-6 pb-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h3 className="tracking-tight">Listen on your platform</h3>
              <p className="text-sm text-muted-foreground">
                One link per service. Subscribe to get new episodes the morning they drop.
              </p>
            </div>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {platforms.map(({ key, label, Icon, bg, fg, ring }) => (
              <li key={key}>
                <a
                  href={episode.links[key]}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 transition hover:border-foreground/20 hover:shadow-sm"
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full ${bg} ${fg} ring-1 ${ring}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm">{label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    Open →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      {/* Blog + Video */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Blog card */}
          <article className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${episode.accent}`} />
              <img
                src={episode.cover}
                alt=""
                className="h-full w-full object-cover mix-blend-overlay transition duration-500 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4">
                <Badge className="gap-1.5 bg-background/90 text-foreground backdrop-blur">
                  <BookOpen className="h-3.5 w-3.5" />
                  Blog
                </Badge>
              </div>
            </div>
            <div className="space-y-3 p-5">
              <h3 className="text-balance tracking-tight">
                Read: Inside the conversation — {episode.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                A companion essay unpacking the key insights from this episode,
                with annotated quotes from {episode.guest} and further reading.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {episode.date} · 6 min read
                </span>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </article>

          {/* Video card */}
          <article className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${episode.accent}`} />
              <img
                src={episode.cover}
                alt=""
                className="h-full w-full object-cover mix-blend-overlay transition duration-500 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4">
                <Badge className="gap-1.5 bg-background/90 text-foreground backdrop-blur">
                  <Play className="h-3.5 w-3.5" />
                  Video
                </Badge>
              </div>
              <button
                type="button"
                aria-label="Play video"
                className="absolute inset-0 grid place-items-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-background/95 text-primary shadow-xl ring-1 ring-black/10 transition group-hover:scale-110">
                  <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                </span>
              </button>
            </div>
            <div className="space-y-3 p-5">
              <h3 className="text-balance tracking-tight">
                Watch: {episode.title} — full episode
              </h3>
              <p className="text-sm text-muted-foreground">
                The complete video conversation with {episode.guest}, including
                visuals, chapter markers, and behind-the-scenes moments.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {episode.duration}
                </span>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  Watch now <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="tracking-tight">Related episodes</h2>
          <Button variant="ghost" size="sm" onClick={onBack}>
            Browse all →
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((e) => (
            <PodcastCard key={e.id} episode={e} onOpen={onOpen} />
          ))}
        </div>
      </section>
    </div>
  );
}
