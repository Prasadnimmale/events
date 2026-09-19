"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, CalendarRange } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/90 shadow-[0_1px_0_0_var(--color-line),0_12px_32px_-16px_rgba(25,23,20,0.25)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:h-18 lg:px-10">
        <a
          href="#home"
          className={`flex items-center gap-2.5 transition-colors duration-500 ${
            scrolled ? "text-charcoal" : "text-white"
          }`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-white">
            <CalendarRange className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-semibold tracking-wide">
            EVERA
            <span className={`ml-2 hidden text-[10px] font-sans font-medium uppercase tracking-[0.3em] sm:inline ${scrolled ? "text-mist" : "text-white/60"}`}>
              Events
            </span>
          </span>
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`group relative text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${
                scrolled ? "text-ink hover:text-gold" : "text-white/85 hover:text-white"
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className={`text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
              scrolled
                ? "bg-charcoal px-5 py-2.5 text-ivory hover:bg-gold"
                : "border border-white/50 px-5 py-2.5 text-white hover:bg-white hover:text-charcoal"
            }`}
          >
            Plan Your Event
          </a>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className={`lg:hidden transition-colors ${scrolled ? "text-charcoal" : "text-white"}`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-t border-line bg-ivory lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 font-display text-2xl text-charcoal transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-dark mt-4 justify-center"
              >
                Plan Your Event
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
