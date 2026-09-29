/**
 * Central site configuration.
 *
 * WHATSAPP:
 * Set your real WhatsApp number in international digits ONLY (no "+", spaces
 * or dashes). Example: for +91 98765 43210 use "919876543210".
 * The enquiry form and "Plan on WhatsApp" buttons use this number.
 */
export const SITE = {
  whatsappNumber: "12125550148",
  email: "hello@evera.events",
  phone: "+1 (212) 555-0148",
  studio: "48 Atelier Lane, New York",
};

/** Open WhatsApp chat with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}