"use client";

import { motion } from "framer-motion";
import { Reveal, Section } from "./Reveal";

const STEPS = [
  { n: "01", title: "Discover", text: "We listen first — your story, guests, budget and dreams shape the brief." },
  { n: "02", title: "Plan", text: "Timelines, budgets and vendor maps locked into a single production plan." },
  { n: "03", title: "Design", text: "Moodboards, staging and sensory details rendered into a visual identity." },
  { n: "04", title: "Execute", text: "Run-of-show precision with a calm production floor and live problem-solving." },
  { n: "05", title: "Celebrate", text: "You host, we hover — every cue lands and every guest remembers." },
];

export default function Process() {
  return (
    <Section className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="eyebrow justify-center">The Journey</p>
        </Reveal>
        <Reveal i={1}>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
            How We Create <span className="italic text-gold">Your Event</span>
          </h2>
        </Reveal>
      </div>

      {/* desktop: horizontal timeline */}
      <div className="relative mt-20 hidden lg:block">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          className="absolute left-0 right-0 top-6 h-px origin-left bg-gold/50"
        />
        <div className="grid grid-cols-5 gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} i={i}>
              <div className="relative">
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-ivory font-display text-sm text-gold transition-colors duration-500 hover:bg-gold hover:text-white">
                  {s.n}
                </span>
                <h3 className="mt-6 font-display text-xl text-charcoal">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* mobile: vertical timeline */}
      <div className="relative mt-16 lg:hidden">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          className="absolute bottom-4 left-6 top-4 w-px origin-top bg-gold/50"
        />
        <div className="flex flex-col gap-12">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} i={Math.min(i, 2)}>
              <div className="relative flex gap-8">
                <span className="z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/40 bg-ivory font-display text-sm text-gold">
                  {s.n}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-xl text-charcoal">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
