import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles, Waves, Mic, BookOpen, Youtube, Play, ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { categories, episodes } from "./podcast-data";
import { PodcastCard } from "./PodcastCard";
import { PlatformBar } from "./PlatformIcons";

const sortOptions = [
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
  { key: "shortest", label: "Shortest" },
  { key: "longest", label: "Longest" },
] as const;

type SortKey = (typeof sortOptions)[number]["key"];

const tabs = [
  { key: "podcast", label: "Podcast", Icon: Mic },
  { key: "blogs", label: "Blogs", Icon: BookOpen },
  { key: "videos", label: "YouTube Videos", Icon: Youtube },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const blogPosts = [
  {
    id: "b1",
    title: "Neuroplasticity in everyday life",
    excerpt:
      "How small daily habits gently rewire attention, memory, and mood — and what the latest research suggests we can actually control.",
    date: "May 28, 2026",
    readTime: "6 min read",
    category: "Neuroscience",
    cover: "https://images.unsplash.com/photo-1559757175-08c08b9d775f?w=800",
  },
  {
    id: "b2",
    title: "The science of stillness",
    excerpt:
      "A look at what happens in the default mode network when we stop doing — and why a wandering mind isn't always a problem.",
    date: "May 14, 2026",
    readTime: "8 min read",
    category: "Mindfulness",
    cover: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
  },
  {
    id: "b3",
    title: "Sleep, memory, and the cleaning crew",
    excerpt:
      "The glymphatic system clears the brain at night. Here's why your eight hours are doing more than you think.",
    date: "April 30, 2026",
    readTime: "5 min read",
    category: "Wellness",
    cover: "https://images.unsplash.com/photo-1515894203077-9cd36032142f?w=800",
  },
];

const videoPosts = [
  {
    id: "v1",
    title: "Inside the meditating brain — a 12-minute tour",
    duration: "12:04",
    date: "Jun 03, 2026",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
  },
  {
    id: "v2",
    title: "Why the gut talks to the brain",
    duration: "18:42",
    date: "May 20, 2026",
    cover: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
  },
  {
    id: "v3",
    title: "Attention, distraction, and the modern mind",
    duration: "21:15",
    date: "May 06, 2026",
    cover: "https://images.unsplash.com/photo-1499914485622-a88fac536970?w=800",
  },
];

export function PodcastList({
  onOpen,
}: {
  onOpen: (id: string) => void;
}) {
  const [tab, setTab] = useState<TabKey>("podcast");
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = episodes.filter((e) => {
      const matchesQ =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.guest.toLowerCase().includes(q) ||
        e.short.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q);
      const matchesCat = activeCat === "All" || e.category === activeCat;
      return matchesQ && matchesCat;
    });
    const minutes = (d: string) => parseInt(d.split(" ")[0], 10);
    const ts = (d: string) => new Date(d).getTime();
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "newest":
          return ts(b.date) - ts(a.date);
        case "oldest":
          return ts(a.date) - ts(b.date);
        case "shortest":
          return minutes(a.duration) - minutes(b.duration);
        case "longest":
          return minutes(b.duration) - minutes(a.duration);
      }
    });
    return list;
  }, [query, activeCat, sort]);

  const featured = episodes[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-700" style={{background:'#0076BE'}} />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-white bg-[#cc252500]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            The NeuroKrish Podcast
          </div>
          <h1 className="max-w-3xl text-balance text-4xl leading-tight tracking-tight md:text-5xl">
            Conversations on the brain, the mind, and the
            <span className="bg-gradient-to-r from-amber-200 to-fuchsia-200 bg-clip-text text-transparent">
              {" "}
              quiet space between them.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Long-form interviews with neuroscientists, clinicians, and
            contemplatives. New episodes every other Wednesday.
          </p>

          {/* Search bar */}
          <div className="mt-8 flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-white/20 bg-white/95 p-2 shadow-2xl shadow-black/20">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search episodes, guests, or topics…"
                className="h-11 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button className="h-11 rounded-xl px-5">Search</Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span>Available on</span>
            <PlatformBar links={featured.links} size="md" />
          </div>
        </div>
        <Waves className="pointer-events-none absolute -bottom-6 right-10 h-40 w-40 text-white/5" />
      </section>

      {/* Tabs */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-6 py-4">
          {tabs.map(({ key, label, Icon }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {tab === "blogs" && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="tracking-tight">From the blog</h2>
            <span className="text-sm text-muted-foreground">
              {blogPosts.length} articles
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((b) => (
              <article
                key={b.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={b.cover}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4">
                    <Badge className="gap-1.5 bg-background/90 text-foreground backdrop-blur">
                      <BookOpen className="h-3.5 w-3.5" />
                      {b.category}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-balance tracking-tight">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.excerpt}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" /> {b.date} · {b.readTime}
                    </span>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "videos" && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="tracking-tight">YouTube videos</h2>
            <span className="text-sm text-muted-foreground">
              {videoPosts.length} videos
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videoPosts.map((v) => (
              <article
                key={v.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={v.cover}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4">
                    <Badge className="gap-1.5 bg-background/90 text-foreground backdrop-blur">
                      <Youtube className="h-3.5 w-3.5" />
                      Video
                    </Badge>
                  </div>
                  <button
                    type="button"
                    aria-label="Play video"
                    className="absolute inset-0 grid place-items-center"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-background/95 text-primary shadow-xl ring-1 ring-black/10 transition group-hover:scale-110">
                      <Play className="h-5 w-5 translate-x-0.5 fill-current" />
                    </span>
                  </button>
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-balance tracking-tight">{v.title}</h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" /> {v.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {v.duration}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "podcast" && (
      <div>
      {/* Filters */}
      <section className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  activeCat === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-sm outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key}>
                  Sort: {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-6 pt-10">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="tracking-tight">Latest episode</h2>
          <span className="text-sm text-muted-foreground">
            {filtered.length} episodes
          </span>
        </div>

        <div
          onClick={() => onOpen(featured.id)}
          className="group relative grid cursor-pointer overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:shadow-xl md:grid-cols-2"
        >
          <div className="relative h-64 md:h-auto">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${featured.accent}`}
            />
            <img
              src={featured.cover}
              alt=""
              className="h-full w-full object-cover mix-blend-overlay opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
          </div>
          <div className="p-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1 text-xs">
              ✨ Featured · {featured.category}
            </div>
            <h2 className="mb-3 text-balance leading-snug">
              {featured.title}
            </h2>
            <p className="mb-2 text-sm text-muted-foreground">
              with {featured.guest} · {featured.duration}
            </p>
            <p className="mb-6 text-muted-foreground">
              {featured.paragraphs[0]}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <PlatformBar links={featured.links} size="md" />
              <Button variant="default">Read more →</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-5 tracking-tight">All episodes</h2>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No episodes match your search. Try a different keyword.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => (
              <PodcastCard key={e.id} episode={e} onOpen={onOpen} />
            ))}
          </div>
        )}
      </section>

      </div>
      )}

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground">
          <span>© 2026 NeuroKrish · Made with curiosity.</span>
          <PlatformBar links={featured.links} />
        </div>
      </footer>
    </div>
  );
}
