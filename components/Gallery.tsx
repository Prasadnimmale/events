"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, Section } from "./Reveal";
import { img } from "@/lib/images";

const ITEMS = [
  { img: img("gallery-0"), cat: "Wedding", title: "The Vow Exchange", h: "aspect-[3/4]" },
  { img: img("gallery-1"), cat: "Stage", title: "Aurora Stage Design", h: "aspect-[4/3]" },
  { img: img("gallery-2"), cat: "Corporate", title: "Summit Keynote Night", h: "aspect-square" },
  { img: img("gallery-4"), cat: "Birthday", title: "Golden Thirty", h: "aspect-[3/4]" },
  { img: img("gallery-5"), cat: "Reception", title: "Candlelight Reception", h: "aspect-[4/3]" },
  { img: img("gallery-6"), cat: "Conference", title: "The Founders Forum", h: "aspect-[3/4]" },
  { img: img("gallery-7"), cat: "Luxury Venue", title: "Marquee Evenings", h: "aspect-[4/3]" },
  { img: img("gallery-8"), cat: "Live Event", title: "Encore at Midnight", h: "aspect-square" },
];

export default function Gallery() {
  return (
    <Section id="gallery" className="bg-parchment py-24 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <p className="eyebrow">The Gallery</p>
          </Reveal>
          <Reveal i={1}>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
              Moments We Have <span className="italic text-gold">Staged.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal i={2}>
          <p className="max-w-sm text-sm leading-relaxed text-mist sm:text-base">
            A selection from recent productions — weddings, summits,
            launches and celebrations of every scale.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
        {ITEMS.map((item, idx) => (
          <Reveal key={item.title} i={idx % 4} className="mb-5 break-inside-avoid">
            <motion.figure
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative overflow-hidden"
            >
              <motion.div
                variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className={`relative ${item.h} w-full will-change-transform`}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>

              <motion.figcaption
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent p-6"
              >
                <motion.p
                  variants={{ rest: { y: 14 }, hover: { y: 0 } }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="text-[10px] font-semibold uppercase tracking-[0.3em] text-goldsoft"
                >
                  {item.cat}
                </motion.p>
                <motion.h3
                  variants={{ rest: { y: 14 }, hover: { y: 0 } }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
                  className="mt-1.5 font-display text-xl text-white"
                >
                  {item.title}
                </motion.h3>
              </motion.figcaption>
            </motion.figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
