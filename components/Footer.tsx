import { CalendarRange } from "lucide-react";

const SOCIALS = ["Instagram", "Pinterest", "LinkedIn"];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-white">
                <CalendarRange className="h-4 w-4" />
              </span>
              <span className="font-display text-xl font-semibold tracking-wide">
                EVERA
                <span className="ml-2 text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-ivory/50">
                  Events
                </span>
              </span>
            </a>
            <p className="mt-5 text-sm leading-relaxed text-ivory/60">
              A full-service event studio designing weddings, corporate
              productions and private celebrations worth remembering.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm sm:grid-cols-3">
            {["Home", "About", "Events", "Services", "Gallery", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-ivory/70 transition-colors hover:text-goldsoft"
              >
                {l}
              </a>
            ))}
          </nav>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-goldsoft">
              Follow Along
            </p>
            <div className="mt-4 flex gap-5">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-sm text-ivory/70 transition-colors hover:text-goldsoft"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EVERA Events. All rights reserved.</p>
          <p>Crafted with intention — every detail, every moment.</p>
        </div>
      </div>
    </footer>
  );
}
