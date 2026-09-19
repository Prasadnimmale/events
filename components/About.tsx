"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Gem, Sparkles, Users } from "lucide-react";
import { Reveal, Section } from "./Reveal";
import { img } from "@/lib/images";

const PILLARS = [
  {
    icon: Compass,
    title: "Creative Planning",
    text: "Concept-driven roadmaps that shape your celebration from the first sketch to the final toast.",
  },
  {
    icon: Gem,
    title: "Attention to Detail",
    text: "Linens, lighting, pacing, plateware — the quiet details guests feel but never notice.",
  },
  {
    icon: Users,
    title: "Seamless Execution",
    text: "Run-of-show precision and a calm production floor, so you stay a guest at your own event.",
  },
  {
    icon: Sparkles,
    title: "Memorable Experiences",
    text: "Moments engineered for emotion — the pause before the reveal, the roar after it.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <Section id="about" className="bg-ivory py-24 sm:py-32">
      <div ref={ref} className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* image with parallax inner */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <motion.div style={{ y: imageY }} className="absolute inset-[-8%] will-change-transform">
              <Image
                src={img("about")}
                alt="Event planners coordinating a production"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/10" />
          </div>
          {/* offset gold frame accent */}
          <div className="absolute -bottom-5 -right-5 -z-10 hidden h-full w-full border border-gold/40 sm:block" />
          <div className="absolute -left-6 top-10 hidden bg-parchment px-5 py-6 shadow-xl sm:block">
            <p className="font-display text-4xl text-gold">12+</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-mist">
              Years of Craft
            </p>
          </div>
        </Reveal>

        {/* content */}
        <div>
          <Reveal>
            <p className="eyebrow">About Our Events</p>
          </Reveal>
          <Reveal i={1}>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
              More Than Events.
              <br />
              <span className="italic text-gold">We Create Experiences.</span>
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              For over a decade we have designed weddings, summits, launches and
              private celebrations across the country — pairing editorial
              aesthetics with flawless logistics. Every event is treated as a
              production: storyboarded, rehearsed, and delivered with calm
              precision.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {PILLARS.map((p, idx) => (
              <Reveal key={p.title} i={idx + 3}>
                <div className="group">
                  <p.icon
                    className="h-6 w-6 text-gold transition-transform duration-500 group-hover:-translate-y-1"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-4 font-display text-xl text-charcoal">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
