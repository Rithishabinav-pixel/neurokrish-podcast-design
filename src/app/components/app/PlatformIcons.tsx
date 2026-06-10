import { Music2, Headphones, ShoppingBag, Podcast } from "lucide-react";

export const platforms = [
  {
    key: "youtube",
    label: "YouTube Music",
    Icon: Music2,
    bg: "bg-red-500/10 hover:bg-red-500/20",
    fg: "text-red-600",
    ring: "ring-red-500/30",
  },
  {
    key: "spotify",
    label: "Spotify",
    Icon: Headphones,
    bg: "bg-emerald-500/10 hover:bg-emerald-500/20",
    fg: "text-emerald-600",
    ring: "ring-emerald-500/30",
  },
  {
    key: "amazon",
    label: "Amazon Music",
    Icon: ShoppingBag,
    bg: "bg-sky-500/10 hover:bg-sky-500/20",
    fg: "text-sky-600",
    ring: "ring-sky-500/30",
  },
  {
    key: "apple",
    label: "Apple Podcasts",
    Icon: Podcast,
    bg: "bg-violet-500/10 hover:bg-violet-500/20",
    fg: "text-violet-600",
    ring: "ring-violet-500/30",
  },
] as const;

export type PlatformKey = (typeof platforms)[number]["key"];

export function PlatformBar({
  links,
  size = "sm",
}: {
  links: Record<PlatformKey, string>;
  size?: "sm" | "md";
}) {
  const dim = size === "md" ? "h-10 w-10" : "h-8 w-8";
  const ic = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-2">
      {platforms.map(({ key, label, Icon, bg, fg, ring }) => (
        <a
          key={key}
          href={links[key]}
          target="_blank"
          rel="noreferrer"
          aria-label={`Listen on ${label}`}
          title={`Listen on ${label}`}
          className={`_icons grid place-items-center rounded-full ring-1 ${ring} transition`}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon className={ic} />
        </a>
      ))}
    </div>
  );
}
