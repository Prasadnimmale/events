"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Section } from "./Reveal";
import { img } from "@/lib/images";

const EVENTS = [
  {
    n: "01",
    title: "Weddings",
    text: "Cinematic celebrations styled around your story.",
    img: img("weddings"),
  },
  {
    n: "02",
    title: "Corporate Events",
    text: "Summits, galas and offsites with boardroom polish.",
    img: img("corporate"),
  },
  {
    n: "03",
    title: "Birthday Celebrations",
    text: "Milestones rendered in colour, light and delight.",
    img: img("birthday"),
  },
  {
    n: "04",
    title: "Engagements",
    text: "Intimate rituals elevated into lasting memories.",
    img: img("engagement"),
  },
  {
    n: "05",
    title: "Conferences",
    text: "Multi-track productions that keep audiences engaged.",
    img: img("conferences"),
  },
  {
    n: "06",
    title: "Product Launches",
    text: "Reveal moments built for press, cameras and buzz.",
    img: img("launches"),
  },
];

export default function EventTypes() {
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
            <motion.a
              href="#contact"
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative block aspect-[4/5] overflow-hidden"
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
            </motion.a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
