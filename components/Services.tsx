"use client";

import {
  Camera,
  ChefHat,
  ClipboardList,
  Lightbulb,
  MapPin,
  Music,
  PartyPopper,
  Briefcase,
} from "lucide-react";
import { Reveal, Section } from "./Reveal";

const SERVICES = [
  { icon: ClipboardList, title: "Event Planning", text: "End-to-end production roadmaps, budgets and vendor orchestration." },
  { icon: MapPin, title: "Venue Decoration", text: "Transformative styling — florals, fabrics, furniture and light." },
  { icon: PartyPopper, title: "Wedding Planning", text: "Full and partial planning for ceremonies that feel like you." },
  { icon: Briefcase, title: "Corporate Events", text: "Conferences, galas and launches with executive-grade polish." },
  { icon: Lightbulb, title: "Stage & Lighting", text: "Scenic design and lighting plots that set the room's emotion." },
  { icon: ChefHat, title: "Catering Coordination", text: "Curated menus and flawless front-of-house service timing." },
  { icon: Camera, title: "Photography & Videography", text: "Editorial photo teams and cinematic film crews." },
  { icon: Music, title: "Entertainment Management", text: "Artists, AV and show-calling choreographed to the minute." },
];

export default function Services() {
  return (
    <Section id="services" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="eyebrow justify-center">Capabilities</p>
        </Reveal>
        <Reveal i={1}>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
            Everything Your Event <span className="italic text-gold">Needs.</span>
          </h2>
        </Reveal>
        <Reveal i={2}>
          <p className="mt-6 text-base leading-relaxed text-mist">
            One team across every discipline — design, production and
            logistics under a single point of contact.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, idx) => (
          <Reveal key={s.title} i={idx % 4} className="h-full">
            <div className="group flex h-full flex-col bg-ivory p-8 transition-colors duration-500 hover:bg-parchment">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-white">
                <s.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 font-display text-lg leading-snug text-charcoal">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
