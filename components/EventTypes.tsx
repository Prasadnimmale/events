"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal, Section } from "./Reveal";
import { img } from "@/lib/images";
import { waLink } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

type EventType = {
  n: string;
  title: string;
  text: string;
  img: string;
  designs: { img: string; title: string; cat: string }[];
};

const EVENTS: EventType[] = [
  {
    n: "01",
    title: "Weddings",
    text: "Cinematic celebrations styled around your story.",
    img: img("weddings"),
    designs: [
      { img: img("gallery-0"), title: "The Vow Exchange", cat: "Ceremony" },
      { img: img("gallery-5"), title: "Candlelight Reception", cat: "Reception" },
      { img: img("gallery-3-2"), title: "Editorial Florals", cat: "Design" },
    ],
  },
  {
    n: "02",
    title: "Corporate Events",
    text: "Summits, galas and offsites with boardroom polish.",
    img: img("corporate"),
    designs: [
      { img: img("gallery-1"), title: "Aurora Stage Design", cat: "Stage" },
      { img: img("gallery-2"), title: "Summit Keynote Night", cat: "Corporate" },
      { img: img("gallery-7"), title: "Marquee Evenings", cat: "Luxury Venue" },
    ],
  },
  {
    n: "03",
    title: "Birthday Celebrations",
    text: "Milestones rendered in colour, light and delight.",
    img: img("birthday"),
    designs: [
      { img: img("gallery-4"), title: "Golden Thirty", cat: "Birthday" },
      { img: img("gallery-6"), title: "The Founders Forum", cat: "Celebration" },
      { img: img("gallery-2"), title: "Summit Keynote Night", cat: "Let's celebrate" },
    ],
  },
  {
    n: "04",
    title: "Engagements",
    text: "Intimate rituals elevated into lasting memories.",
    img: img("engagement"),
    designs: [
      { img: img("gallery-5"), title: "Candlelight Reception", cat: "Intimate" },
      { img: img("gallery-0"), title: "The Vow Exchange", cat: "Ritual" },
      { img: img("gallery-3-2"), title: "Editorial Florals", cat: "Design" },
    ],
  },
  {
    n: "05",
    title: "Conferences",
    text: "Multi-track productions that keep audiences engaged.",
    img: img("conferences"),
    designs: [
      { img: img("gallery-6"), title: "The Founders Forum", cat: "Conference" },
      { img: img("gallery-2"), title: "Summit Keynote Night", cat: "Corporate" },
      { img: img("gallery-1"), title: "Aurora Stage Design", cat: "Stage" },
    ],
  },
  {
    n: "06",
    title: "Product Launches",
    text: "Reveal moments built for press, cameras and buzz.",
    img: img("launches"),
    designs: [
      { img: img("gallery-3-2"), title: "Encore at Midnight", cat: "Live Event" },
      { img: img("gallery-7"), title: "Marquee Evenings", cat: "Venue" },
      { img: img("gallery-2"), title: "Summit Keynote Night", cat: "Corporate" },
    ],
  },
];

export default function EventTypes() {
  const [active, setActive] = useState<EventType | null>(null);

  // lock body scroll while the designs modal is open + close on Escape
  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <Section id="events" className="bg-parchment py-24 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <p className="eyebrow">What We Craft</p>
          </Reveal>
          <Reveal i={1}>
            <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
              Signature Events,
              <br />
              <span className="italic text-gold">Distinctly Yours.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal i={2}>
          <p className="max-w-sm text-sm leading-relaxed text-mist sm:text-base">
            Six disciplines, one obsession — events that feel effortless from
            the outside and are meticulously engineered underneath.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((e, idx) => (
          <Reveal key={e.n} i={idx % 3}>
            <motion.button
              type="button"
              onClick={() => setActive(e)}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden text-left"
            >
              <motion.div
                variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
                transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={e.img}
                  alt={e.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>

              {/* gradient veil that deepens on hover */}
              <motion.div
                variants={{ rest: { opacity: 0.45 }, hover: { opacity: 0.8 } }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"
              />

              {/* gold edge wipe on hover */}
              <motion.div
                variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gold"
              />

              <div className="absolute inset-0 flex flex-col justify-between p-7">
                <div className="flex items-start justify-between">
                  <span className="font-display text-lg text-white/85">{e.n}</span>
                  <motion.span
                    variants={{ rest: { opacity: 0, x: -8, y: 8 }, hover: { opacity: 1, x: 0, y: 0 } }}
                    transition={{ duration: 0.4 }}
                    className="grid h-11 w-11 place-items-center rounded-full bg-gold text-white"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.span>
                </div>
                <div>
                  <motion.h3
                    variants={{ rest: { y: 0 }, hover: { y: -6 } }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="font-display text-2xl text-white sm:text-[1.7rem]"
                  >
                    {e.title}
                  </motion.h3>
                  <motion.p
                    variants={{ rest: { opacity: 0.75 }, hover: { opacity: 1 } }}
                    className="mt-2 max-w-[26ch] text-sm leading-relaxed text-white/75"
                  >
                    {e.text}
                  </motion.p>
                </div>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>

      {/* ============ DESIGNS MODAL ============ */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-charcoal/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} designs`}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto bg-ivory sm:max-h-[86svh]"
            >
              {/* close */}
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-charcoal/60 text-white backdrop-blur transition-colors hover:bg-charcoal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* hero image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={active.img}
                  alt={active.title}
                  fill
                  sizes="(min-width: 1024px) 56rem, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-10">
                  <p className="eyebrow !text-goldsoft">
                    {active.n} — {active.title}
                  </p>
                  <h3 className="mt-4 font-display text-3xl leading-[1.08] text-white sm:text-5xl">
                    Signature
                    <br />
                    <span className="italic text-goldsoft">{active.title}</span>
                  </h3>
                </div>
              </div>

              {/* body */}
              <div className="p-6 sm:p-10">
                <p className="max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
                  {active.text} From concept boards to the final reveal, every
                  design below is tailored to your story — scale, palette and
                  atmosphere.
                </p>

                {/* design grid */}
                <div className="mt-8 grid gap-5 sm:grid-cols-3">
                  {active.designs.map((d) => (
                    <figure key={d.title} className="group">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={d.img}
                          alt={d.title}
                          fill
                          sizes="(min-width: 640px) 33vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                      <figcaption className="mt-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                          {d.cat}
                        </p>
                        <p className="mt-0.5 font-display text-lg text-charcoal">{d.title}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>

                {/* enquiry CTA */}
                <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-sm leading-relaxed text-mist">
                    Want this styled for your occasion? Start the conversation
                    on WhatsApp — we reply fast.
                  </p>
                  <a
                    href={waLink(
                      `Hi EVERA! I'd love to plan a ${active.title.toLowerCase()} event and would like to discuss designs.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold shrink-0"
                  >
                    <WhatsAppIcon />
                    Plan on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}