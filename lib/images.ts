export type EventImage =
  | "hero"
  | "about"
  | "transition"
  | "weddings"
  | "corporate"
  | "birthday"
  | "engagement"
  | "conferences"
  | "launches"
  | "featured"
  | `gallery-${number}`;

const IMAGES = {
  hero: "/images/events/hero/hero.jpg",
  about: "/images/events/about/about.jpg",
  transition: "/images/events/about/transition.jpg",
  weddings: "/images/events/weddings/wedding.jpg",
  corporate: "/images/events/corporate/corporate.jpg",
  birthday: "/images/events/birthday/birthday.jpg",
  engagement: "/images/events/engagements/engagement.jpg",
  conferences: "/images/events/conferences/conference.jpg",
  launches: "/images/events/launches/launch.jpg",
  featured: "/images/events/featured/featured.jpg",
  "gallery-0": "/images/events/gallery/gallery-01.jpg",
  "gallery-1": "/images/events/gallery/gallery-02.jpg",
  "gallery-2": "/images/events/gallery/gallery-03.jpg",
  "gallery-3": "/images/events/gallery/gallery-4.jpg",
  "gallery-3-2": "/images/events/gallery/gallery-04.jpg",
  "gallery-4": "/images/events/gallery/gallery-05.jpg",
  "gallery-5": "/images/events/gallery/gallery-06.jpg",
  "gallery-6": "/images/events/gallery/gallery-07.jpg",
  "gallery-7": "/images/events/gallery/gallery-08.jpg",
} as const;

type Key = keyof typeof IMAGES;

/** Resolve an EventImage key to its local path, with legacy-key fallbacks. */
export function img(key: EventImage | string): string {
  const normalized = (key in IMAGES ? key : key.replace(/(\d)$/, "0$1")) as Key;
  return IMAGES[normalized] ?? IMAGES["gallery-0"];
}
