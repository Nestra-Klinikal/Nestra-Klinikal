import type { PortableTextBlock } from "@portabletext/react";

export type ProgrammeCategory =
  | "qms"
  | "clinical-research"
  | "laboratory"
  | "specialist"
  | "corporate";

export type ProgrammeLevel = "foundation" | "core" | "advanced" | "specialist";

export type DeliveryMode = "online-live" | "online-self" | "in-person" | "blended";

export type IntakeStatus = "open" | "filling" | "closed";

export type CurriculumModule = {
  title: string;
  description?: string;
};

export type Programme = {
  _id: string;
  title: string;
  slug: string;
  category: ProgrammeCategory;
  level: ProgrammeLevel;
  summary: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  whoItIsFor?: string[];
  outcomes?: string[];
  curriculum?: CurriculumModule[];
  body?: PortableTextBlock[];
  duration?: string;
  deliveryMode?: DeliveryMode;
  entryRequirements?: string[];
  certification?: string;
  requiresSupervisedHours?: boolean;
  feeNaira?: number | null;
  feeUsd?: number | null;
  feeNote?: string;
  featured?: boolean;
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
};

export type Intake = {
  _id: string;
  programmeTitle: string;
  programmeSlug: string;
  startDate: string;
  applicationDeadline?: string;
  mode?: DeliveryMode;
  location?: string;
  status: IntakeStatus;
  seatsNote?: string;
};

export type Testimonial = {
  _id: string;
  name: string;
  role?: string;
  cohort?: string;
  quote: string;
  imageUrl?: string | null;
  featured?: boolean;
};

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  group?: "leadership" | "faculty" | "operations";
  bio?: string;
  credentials?: string[];
  imageUrl?: string | null;
  linkedin?: string;
};

export type Partner = {
  _id: string;
  name: string;
  kind?: "private" | "state" | "federal" | "corporate";
  location?: string;
  description?: string;
  logoUrl?: string | null;
};

export type Faq = {
  _id: string;
  question: string;
  answer: string;
  topic?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  coverImageUrl?: string | null;
  authorName?: string;
  body?: PortableTextBlock[];
};

export type SocialLink = {
  platform: "linkedin" | "twitter" | "facebook" | "instagram" | "youtube";
  url: string;
};

export type SiteSettings = {
  whatsappNumber: string;
  phoneDisplay?: string;
  email?: string;
  address?: string;
  announcementEnabled?: boolean;
  announcementText?: string;
  announcementLink?: string;
  socialLinks?: SocialLink[];
  legalName?: string;
  rcNumber?: string;
  completionsCount?: number | null;
};
