"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { img } from "@/lib/images";

const EASE = [0.23, 1, 0.32, 1] as const;

/** How long the video gets to arrive & settle before any text enters. */
const VIDEO_SETTLE_MS = 1600;
/** Safety net: text never waits forever if the video stalls or fails. */
const TEXT_FALLBACK_MS = 3200;

export default function HeroCinematic() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  // text enters only after the video has arrived & settled (or fallback fires)
  const [textIn, setTextIn] = useState(false);

  // Scroll progress 0 → 1 across the pinned transition, measured manually so it
  // can never go stale (viewport height changes on mobile chrome, image loads,
  // etc. are handled by the ResizeObserver below).
  const progress: MotionValue<number> = useMotionValue(0);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const update = () => {
      const travel = section.offsetHeight - window.innerHeight;
      const local = window.scrollY - section.offsetTop;
      progress.set(travel > 0 ? Math.min(Math.max(local / travel, 0), 1) : 0);
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

  // sequence: video ready → settle pad → release the text stagger
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) setVideoReady(true);
  }, []);

  useEffect(() => {
    const t = setTimeout(
      () => setTextIn(true),
      !videoReady ? TEXT_FALLBACK_MS : reducedMotion ? 0 : VIDEO_SETTLE_MS
    );
    return () => clearTimeout(t);
  }, [videoReady, reducedMotion]);

  // pause the looping video once the hero has been wiped away
  useEffect(() => {
    const unsub = progress.on("change", (p) => {
      const v = videoRef.current;
      if (!v) return;
      if (p > 0.8 && !v.paused) v.pause();
      else if (p <= 0.8 && v.paused && !document.hidden) v.play().catch(() => {});
    });
    return unsub;
  }, [progress]);

  // ----- phase 1: hero breathes (scale + drift), content lifts away -----
  const heroScale = useTransform(progress, [0, 0.3], [1, 1.14]);
  const heroY = useTransform(progress, [0, 0.3], ["0%", "8%"]);
  const heroContentY = useTransform(progress, [0, 0.2], ["0%", "-70%"]);
  const heroContentOpacity = useTransform(progress, [0, 0.14], [1, 0]);
  const scrollHintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  // ----- phase 2: diagonal wipe — hero video is cut away from its left edge -----
  const heroClip = useTransform(progress, (p) => {
    const t = Math.min(Math.max((p - 0.3) / 0.42, 0), 1); // 0.3 → 0.72
    const x = t * 100;
    return `polygon(0% 0%, ${x}% 0%, calc(${x}% - 32vw) 100%, 0% 100%)`;
  });

  // ----- phase 3: second image enters from behind, counter-scales to settle -----
  const revealScale = useTransform(progress, [0.3, 0.78], [1.18, 1.02]);
  const revealY = useTransform(progress, [0.3, 0.78], ["-6%", "0%"]);

  // ----- phase 4: staggered content reveal on the new image -----
  const labelOpacity = useTransform(progress, [0.62, 0.72], [0, 1]);
  const labelY = useTransform(progress, [0.62, 0.72], [28, 0]);
  const headingY = useTransform(progress, [0.68, 0.8], [48, 0]);
  const headingOpacity = useTransform(progress, [0.68, 0.8], [0, 1]);
  const textY = useTransform(progress, [0.74, 0.86], [32, 0]);
  const textOpacity = useTransform(progress, [0.74, 0.86], [0, 1]);
  const btnY = useTransform(progress, [0.8, 0.9], [24, 0]);
  const btnOpacity = useTransform(progress, [0.8, 0.9], [0, 1]);
  const overlayOpacity = useTransform(progress, [0.35, 0.75], [0.18, 0.62]);

  /** Gated entrance: holds hidden until textIn flips, then staggers in. */
  const gated = (i: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: textIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { duration: 0.9, ease: EASE, delay: i * 0.15 },
  });

  return (
    /* shorter scroll runway on mobile so the transition never feels like a trap */
    <section ref={ref} id="home" className="relative h-[190vh] md:h-[270vh]">
      {/* pin the stage for the whole scroll length, release into normal flow */}
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* ============ IMAGE 2 — the event image entering from behind ============ */}
        <motion.div
          style={{ scale: revealScale, y: revealY }}
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

        {/* ============ VIDEO 1 — hero, being clipped away ============ */}
        <motion.div
          style={{ scale: heroScale, y: heroY, clipPath: heroClip }}
          className="absolute inset-0 z-10 will-change-transform"
        >
          {/* poster fallback sits under the video so a failed load never blanks the hero */}
          <Image
            src={img("hero")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* the video itself arrives first: fades in and settles before any text */}
          <motion.video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/images/events/hero/hero.mp4"
            poster={img("hero")}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-hidden="true"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoReady(true)}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: reducedMotion ? 0 : 0.35 }}
          />

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

          {/* scroll hint (also waits for the video to settle) */}
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: textIn ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">
                Scroll
              </span>
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="block h-10 w-px bg-gradient-to-b from-white/80 to-transparent"
              />
            </motion.div>
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
