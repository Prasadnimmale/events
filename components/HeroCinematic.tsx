"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { img } from "@/lib/images";

const EASE = [0.23, 1, 0.32, 1] as const;

/** How long the hero image gets to arrive & settle before any text enters. */
const SETTLE_MS = 1100;

/** smoothstep easing for the scroll timeline */
const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
/** progress of `p` through the window [a..b], eased, clamped to 0..1 */
const stage = (p: number, a: number, b: number) => smooth(clamp01((p - a) / (b - a)));

/** lighter motion on small screens, fuller on desktop. */
const strengthFor = (w: number) => (w < 768 ? 0.72 : w < 1200 ? 0.88 : 1);

export default function HeroCinematic() {
  const ref = useRef<HTMLElement>(null);
  const strengthRef = useRef(1);
  const reducedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [textIn, setTextIn] = useState(false);

  // scroll progress 0 → 1 across the pinned transition, measured manually so it
  // can never go stale (viewport changes on mobile chrome are handled below).
  const progress = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const update = () => {
      const travel = section.offsetHeight - window.innerHeight;
      const local = window.scrollY - section.offsetTop;
      progress.set(travel > 0 ? clamp01(local / travel) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(section);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [progress]);

  // device-aware strength (tablet/mobile reduce scale & travel)
  useEffect(() => {
    const onResize = () => {
      strengthRef.current = strengthFor(window.innerWidth);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // text enters after the hero image has had a moment to arrive & settle
  useEffect(() => {
    const t = setTimeout(() => setTextIn(true), reducedMotion ? 0 : SETTLE_MS);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  // ================= HERO IMAGE — scale up slightly, then drift =================
  // 25% scale starts, 45% movement starts, both peak mid-wipe
  const heroScale = useTransform(progress, (p) =>
    reducedRef.current ? 1 : 1 + 0.1 * strengthRef.current * stage(p, 0.25, 0.65)
  );
  const heroY = useTransform(progress, (p) =>
    reducedRef.current
      ? "0%"
      : `${(-7 * strengthRef.current * stage(p, 0.45, 0.75)).toFixed(2)}%`
  );
  // reduced-motion fallback: gentle crossfade instead of the wipe
  const heroOpacity = useTransform(progress, (p) =>
    reducedRef.current ? 1 - stage(p, 0.55, 0.8) : 1
  );

  // ================= HERO TEXT — lifts away before the wipe =================
  const heroContentY = useTransform(progress, (p) =>
    reducedRef.current ? "0%" : `${(-68 * stage(p, 0.28, 0.58)).toFixed(2)}%`
  );
  const heroContentOpacity = useTransform(progress, (p) => 1 - stage(p, 0.28, 0.5));

  // ================= DIAGONAL WIPE — hero is cut away, left → right =================
  // polygon starts covering the full screen and slides a diagonal cut out to the
  // right, continuously revealing the event image stacked behind the hero.
  const heroClip = useTransform(progress, (p) => {
    if (reducedRef.current) return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
    const t = stage(p, 0.6, 0.9);
    const x = 175 - 185 * t;
    return `polygon(0% 0%, ${x.toFixed(2)}% 0%, ${(x - 62).toFixed(2)}% 100%, 0% 100%)`;
  });

  // ================= SECOND IMAGE — enters from behind, settles =================
  const revealScale = useTransform(
    progress,
    (p) => 1.16 - 0.14 * strengthRef.current * stage(p, 0.58, 0.92)
  );
  const revealY = useTransform(progress, (p) =>
    `${(5 * strengthRef.current * (1 - stage(p, 0.58, 0.92))).toFixed(2)}%`
  );
  const revealOpacity = useTransform(progress, (p) =>
    reducedRef.current ? 0.1 + 0.9 * stage(p, 0.48, 0.78) : 0.9 + 0.1 * stage(p, 0.6, 0.8)
  );
  const overlayOpacity = useTransform(progress, (p) => 0.16 + 0.46 * stage(p, 0.6, 0.98));

  // ================= STAGGERED ABOUT CONTENT — label → heading → text → button =================
  const labelOpacity = useTransform(progress, (p) => stage(p, 0.66, 0.76));
  const labelY = useTransform(progress, (p) =>
    reducedRef.current ? 0 : 26 - 26 * stage(p, 0.66, 0.76)
  );
  const headingOpacity = useTransform(progress, (p) => stage(p, 0.72, 0.84));
  const headingY = useTransform(progress, (p) =>
    reducedRef.current ? 0 : 54 - 54 * stage(p, 0.72, 0.84)
  );
  const textOpacity = useTransform(progress, (p) => stage(p, 0.78, 0.9));
  const textY = useTransform(progress, (p) =>
    reducedRef.current ? 0 : 36 - 36 * stage(p, 0.78, 0.9)
  );
  const btnOpacity = useTransform(progress, (p) => stage(p, 0.84, 0.96));
  const btnY = useTransform(progress, (p) =>
    reducedRef.current ? 0 : 26 - 26 * stage(p, 0.84, 0.96)
  );

  /** Gated entrance: holds hidden until textIn flips, then staggers in. */
  const gated = (i: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: textIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { duration: 0.9, ease: EASE, delay: i * 0.15 },
  });

  return (
    /* shorter scroll runway on mobile so the transition never feels like a trap */
    <section ref={ref} id="home" className="relative h-[200vh] md:h-[260vh]">
      {/* pin the stage for the whole scroll length, release into normal flow */}
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* ============ IMAGE 2 — the event image entering from behind ============ */}
        <motion.div
          style={{ scale: revealScale, y: revealY, opacity: revealOpacity }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={img("transition")}
            alt="Grand event venue prepared for a celebration"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-charcoal" />

          {/* ============ IMAGE 2 CONTENT — staggered reveal ============ */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
              <div className="max-w-2xl">
                <motion.p
                  style={{ opacity: labelOpacity, y: labelY }}
                  className="eyebrow !text-goldsoft"
                >
                  About Us
                </motion.p>
                <motion.h2
                  style={{ opacity: headingOpacity, y: headingY }}
                  className="mt-6 font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl"
                >
                  Turning Every Event
                  <br />
                  Into an Experience.
                </motion.h2>
                <motion.p
                  style={{ opacity: textOpacity, y: textY }}
                  className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
                >
                  We plan, design, and manage memorable events with thoughtful
                  details, creative direction, and seamless execution.
                </motion.p>
                <motion.div style={{ opacity: btnOpacity, y: btnY }} className="mt-10">
                  <a href="#about" className="btn-gold group">
                    Discover Our Story
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============ HERO IMAGE — being clipped away ============ */}
        <motion.div
          style={{ scale: heroScale, y: heroY, clipPath: heroClip, opacity: heroOpacity }}
          className="absolute inset-0 z-10 will-change-transform"
        >
          {/* continuous video-like Ken-Burns loop so the still image never feels flat */}
          <motion.div
            initial={{ scale: 1.08 }}
            animate={
              reducedMotion
                ? { scale: 1 }
                : { scale: [1.08, 1.16, 1.08], y: [0, -16, 0] }
            }
            transition={{
              scale: { duration: 16, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={img("hero")}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          {/* readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/40" />
          {/* cinematic vignette */}
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_90%_at_50%_45%,transparent_55%,rgba(25,23,20,0.5)_100%)]" />
          {/* film grain */}
          <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
          {/* one-shot light sweep on load */}
          {!reducedMotion && (
            <motion.div
              initial={{ x: "-70%", opacity: 0 }}
              animate={{ x: "340%", opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.7, ease: "easeInOut", delay: 1.15, times: [0, 0.45, 1] }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              aria-hidden="true"
            />
          )}

          {/* ============ HERO CONTENT ============ */}
          <motion.div
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            className="absolute inset-0 flex items-center"
          >
            <div className="mx-auto w-full max-w-7xl px-6 pt-16 lg:px-10">
              <div className="max-w-3xl">
                <motion.p {...gated(0)} className="eyebrow !text-white/85">
                  Events • Experiences • Memories
                </motion.p>
                <h1 className="mt-7 font-display text-5xl leading-[1.04] text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                  <span className="block overflow-hidden pb-1">
                    <motion.span
                      className="block"
                      initial={{ y: "110%" }}
                      animate={textIn ? { y: 0 } : { y: "110%" }}
                      transition={{ duration: 1, ease: EASE, delay: 0.05 }}
                    >
                      We Create Moments
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden pb-2">
                    <motion.span
                      className="block italic text-goldsoft"
                      initial={{ y: "110%" }}
                      animate={textIn ? { y: 0 } : { y: "110%" }}
                      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                    >
                      Worth Remembering.
                    </motion.span>
                  </span>
                </h1>
                <motion.p {...gated(1)} className="mt-7 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                  From intimate celebrations to extraordinary events, we design
                  experiences that leave a lasting impression.
                </motion.p>
                <motion.div {...gated(2)} className="mt-10 flex flex-wrap gap-4">
                  <a href="#events" className="btn-gold">
                    Explore Events
                  </a>
                  <a href="#contact" className="btn-outline">
                    Plan Your Event
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ============ LETTERBOX INTRO — cinematic bars lift on load ============ */}
        {!reducedMotion && (
          <>
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.25 }}
              className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[13vh] origin-top bg-charcoal"
              aria-hidden="true"
            />
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.25 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[13vh] origin-bottom bg-charcoal"
              aria-hidden="true"
            />
          </>
        )}
      </div>
    </section>
  );
}