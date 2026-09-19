"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { img } from "@/lib/images";

export default function FeaturedEvent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // subtle scroll-driven scale + drift = cinematic parallax
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.8], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative">
      <div className="relative h-[85vh] min-h-[560px] overflow-hidden">
        <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
          <Image
            src={img("featured")}
            alt="Luxury ballroom event in full swing"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/30" />

        <motion.div
          style={{ y: contentY }}
          className="absolute inset-0 flex items-center"
        >
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <Reveal>
              <p className="eyebrow !text-goldsoft">Featured Showcase</p>
            </Reveal>
            <Reveal i={1}>
              <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                Your Vision.
                <br />
                <span className="italic text-goldsoft">Our Execution.</span>
              </h2>
            </Reveal>
            <Reveal i={2}>
              <div className="mt-10">
                <a href="#events" className="btn-outline group">
                  View Our Events
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
