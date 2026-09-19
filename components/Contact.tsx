"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Reveal, Section } from "./Reveal";

type Fields = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  venue: string;
  message: string;
};

const INITIAL: Fields = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  date: "",
  guests: "",
  venue: "",
  message: "",
};

const EVENT_TYPES = [
  "Wedding",
  "Corporate Event",
  "Birthday Celebration",
  "Engagement",
  "Conference",
  "Product Launch",
  "Other Celebration",
];

type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Please enter a valid email address.";
  if (f.phone && f.phone.replace(/\D/g, "").length < 7)
    e.phone = "Please enter a valid phone number.";
  if (!f.eventType) e.eventType = "Please select an event type.";
  if (f.date) {
    const d = new Date(f.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) e.date = "Event date should be in the future.";
  }
  if (f.guests) {
    const n = Number(f.guests);
    if (!Number.isInteger(n) || n <= 0 || n > 100000)
      e.guests = "Please enter a valid guest count.";
  }
  if (f.message.trim().length > 2000) e.message = "Message is too long.";
  return e;
}

const inputCls =
  "w-full border border-line bg-ivory px-4 py-3.5 text-sm text-charcoal outline-none transition-colors placeholder:text-mist/60 focus:border-gold";

export default function Contact() {
  const [values, setValues] = useState<Fields>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set =
    (k: keyof Fields) =>
    (
      ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) =>
      setValues((v) => ({ ...v, [k]: ev.target.value }));

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  const field = (k: keyof Fields, label: string, type = "text", required = false) => (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <input
        type={type}
        value={values[k]}
        onChange={set(k)}
        placeholder={`Your ${label.toLowerCase()}`}
        className={inputCls}
      />
      {errors[k] && <p className="mt-1.5 text-xs text-red-600">{errors[k]}</p>}
    </div>
  );

  return (
    <Section id="contact" className="bg-ivory py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        {/* left rail */}
        <div>
          <Reveal>
            <p className="eyebrow">Start Here</p>
          </Reveal>
          <Reveal i={1}>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl">
              Let&rsquo;s Plan Something
              <br />
              <span className="italic text-gold">Extraordinary.</span>
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-mist">
              Tell us about your occasion — date, guests, atmosphere. Our
              producers reply within one business day with next steps and a
              curated venue shortlist.
            </p>
          </Reveal>
          <Reveal i={3}>
            <div className="mt-10 space-y-4 border-l-2 border-gold/40 pl-6">
              <p className="text-sm text-ink"><span className="font-semibold">Email</span> — hello@evera.events</p>
              <p className="text-sm text-ink"><span className="font-semibold">Phone</span> — +1 (212) 555-0148</p>
              <p className="text-sm text-ink"><span className="font-semibold">Studio</span> — 48 Atelier Lane, New York</p>
            </div>
          </Reveal>
        </div>

        {/* form */}
        <Reveal i={1}>
          <div className="border border-line bg-parchment/60 p-7 sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <CheckCircle2 className="h-14 w-14 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-6 font-display text-3xl text-charcoal">
                    Enquiry Received.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
                    Thank you, {values.name.split(" ")[0] || "friend"}. A producer
                    will reach out within one business day to begin shaping your
                    event.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35 }}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  {field("name", "Name", "text", true)}
                  {field("email", "Email", "email", true)}
                  {field("phone", "Phone", "tel")}
                  {field("date", "Event Date", "date")}

                  {/* event type select */}
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
                      Event Type<span className="ml-1 text-gold">*</span>
                    </label>
                    <select
                      value={values.eventType}
                      onChange={set("eventType")}
                      className={`${inputCls} ${values.eventType ? "" : "text-mist/60"}`}
                    >
                      <option value="" disabled>
                        Select an event type
                      </option>
                      {EVENT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.eventType && (
                      <p className="mt-1.5 text-xs text-red-600">{errors.eventType}</p>
                    )}
                  </div>

                  {field("guests", "Guest Count", "number")}
                  {field("venue", "Venue / Location", "text")}

                  {/* message */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={values.message}
                      onChange={set("message")}
                      placeholder="Tell us about the atmosphere you imagine…"
                      className={`${inputCls} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <button type="submit" className="btn-dark w-full justify-center sm:w-auto">
                      Start Planning
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
