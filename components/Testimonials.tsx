"use client";

import { Quote } from "lucide-react";
import { Reveal, Section } from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "They turned our venue into something from a film set. Every cue landed, every guest asked who had planned it.",
    name: "Aanya & Rohan Mehta",
    event: "Wedding — 320 Guests",
  },
  {
    quote:
      "Three conference days, zero visible hiccups. Their production discipline is unlike any team we have worked with.",
    name: "Sarah Whitfield",
    event: "Corporate Summit — 1,200 Delegates",
  },
  {
    quote:
      "The launch felt like a premiere. Press, lighting, timing — everything simply flowed, and the room felt it.",
    name: "Daniel Okafor",
    event: "Product Launch — Flagship Reveal",
  },
];

export default function Testimonials() {
  return (
    <Section className="bg-parchment py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="eyebrow justify-center">Kind Words</p>
        </Reveal>
        <Reveal i={1}>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
            Loved by Hosts <span className="italic text-gold">Everywhere.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} i={i}>
            <figure className="flex h-full flex-col border border-line bg-ivory p-9 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(25,23,20,0.35)]">
              <Quote className="h-7 w-7 text-gold/60" strokeWidth={1.5} />
              <blockquote className="mt-6 flex-1 text-base leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-6">
                <p className="font-display text-lg text-charcoal">{t.name}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-mist">
                  {t.event}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
