/**
 * WhatsApp deep links.
 *
 * WhatsApp taps are the main enquiry signal for this business, so every link is
 * built here rather than hand-written, and every one carries a pre-filled
 * message naming the specific programme or service.
 */

/** Strips anything that is not a digit; wa.me rejects spaces and plus signs. */
function normaliseNumber(raw: string): string {
  return raw.replace(/\D/g, "");
}

export function whatsappLink(number: string, message: string): string {
  const digits = normaliseNumber(number);
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function programmeEnquiryMessage(programmeTitle: string): string {
  return `Hello Nestra Klinikal. I would like to know more about the ${programmeTitle} programme — fees, the next intake date, and how to apply.`;
}

export function programmeApplicationMessage(programmeTitle: string): string {
  return `Hello Nestra Klinikal. I would like to apply for the ${programmeTitle} programme. Please send me the application steps and payment details.`;
}

export function corporateEnquiryMessage(): string {
  return "Hello Nestra Klinikal. I am enquiring on behalf of an organisation about quality management systems consulting, an in-house cohort, or accreditation readiness support.";
}

export function partnershipEnquiryMessage(): string {
  return "Hello Nestra Klinikal. I represent an institution interested in running Nestra Klinikal programmes in partnership with you.";
}

export function generalEnquiryMessage(): string {
  return "Hello Nestra Klinikal. I would like to know more about your training programmes.";
}
