import { z } from "zod";

/**
 * The exact wording a person agrees to when they tick the consent box. It is
 * stored verbatim with every lead, because the Nigeria Data Protection Act
 * requires evidence of what consent was given for, not merely that it existed.
 */
export const CONSENT_TEXT =
  "I agree that Nestra Klinikal Limited may contact me by email and WhatsApp about training programmes, intake dates and related services. I understand I can withdraw this consent at any time by replying to any message or emailing info@nestraklinikal.com.";

export const leadTypeSchema = z.enum([
  "newsletter",
  "programme-enquiry",
  "application",
  "corporate",
  "partnership",
  "lead-magnet",
  "contact",
]);

export type LeadType = z.infer<typeof leadTypeSchema>;

const utmSchema = z
  .object({
    utm_source: z.string().max(120).optional(),
    utm_medium: z.string().max(120).optional(),
    utm_campaign: z.string().max(120).optional(),
    utm_term: z.string().max(120).optional(),
    utm_content: z.string().max(120).optional(),
  })
  .optional();

/** Shape accepted by POST /api/leads. Validated at the boundary. */
export const leadSubmissionSchema = z.object({
  email: z
    .string()
    .min(1, "Enter your email address")
    .email("Enter a valid email address")
    .max(254)
    .transform((value) => value.trim().toLowerCase()),
  name: z.string().max(120).optional(),
  phone: z.string().max(40).optional(),
  organisation: z.string().max(160).optional(),
  organisationSize: z.string().max(60).optional(),
  message: z.string().max(4000).optional(),
  leadType: leadTypeSchema.default("newsletter"),
  programmeId: z.string().max(120).optional(),
  programmeTitle: z.string().max(200).optional(),
  sourcePage: z.string().max(300).optional(),
  consentGiven: z.boolean(),
  utm: utmSchema,
  // Bots fill hidden fields; humans leave them empty.
  company_website: z.string().max(0, "Rejected").optional(),
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

/** Newsletter signup: email plus consent. */
export const newsletterFormSchema = z.object({
  email: z.string().min(1, "Enter your email address").email("Enter a valid email address"),
  consentGiven: z.boolean().refine((v) => v === true, {
    message: "Please tick the box so we can contact you",
  }),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

/** Programme enquiry or application. */
export const programmeEnquirySchema = z.object({
  name: z.string().min(2, "Enter your full name").max(120),
  email: z.string().min(1, "Enter your email address").email("Enter a valid email address"),
  phone: z.string().max(40).optional(),
  message: z.string().max(2000).optional(),
  consentGiven: z.boolean().refine((v) => v === true, {
    message: "Please tick the box so we can contact you",
  }),
});

export type ProgrammeEnquiryValues = z.infer<typeof programmeEnquirySchema>;

export const ORGANISATION_SIZES = [
  "1–10 staff",
  "11–50 staff",
  "51–200 staff",
  "201–500 staff",
  "More than 500 staff",
] as const;

/** Corporate and consulting enquiry: the high-value business-to-business route. */
export const corporateEnquirySchema = z.object({
  name: z.string().min(2, "Enter your full name").max(120),
  email: z.string().min(1, "Enter your work email address").email("Enter a valid email address"),
  phone: z.string().max(40).optional(),
  organisation: z.string().min(2, "Enter your organisation's name").max(160),
  organisationSize: z.enum(ORGANISATION_SIZES, {
    errorMap: () => ({ message: "Choose the closest size" }),
  }),
  message: z.string().min(10, "Tell us briefly what you need").max(2000),
  consentGiven: z.boolean().refine((v) => v === true, {
    message: "Please tick the box so we can contact you",
  }),
});

export type CorporateEnquiryValues = z.infer<typeof corporateEnquirySchema>;

/** Partnership enquiry from an institution. */
export const partnershipEnquirySchema = corporateEnquirySchema;
export type PartnershipEnquiryValues = CorporateEnquiryValues;

/** General contact form. */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Enter your full name").max(120),
  email: z.string().min(1, "Enter your email address").email("Enter a valid email address"),
  phone: z.string().max(40).optional(),
  message: z.string().min(10, "Please tell us how we can help").max(2000),
  consentGiven: z.boolean().refine((v) => v === true, {
    message: "Please tick the box so we can contact you",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
