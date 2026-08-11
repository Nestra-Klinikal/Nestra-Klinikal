/**
 * Seed content.
 *
 * This is what the site renders before a Sanity project is connected, and it is
 * also the reference for what the administrator should create in Studio.
 *
 * Every fact here traces to the existing nestraklinikal.com site or to the
 * Nestra Klinikal project brief. Nothing is invented. Anything not yet
 * confirmed is marked with PLACEHOLDER and listed in PLACEHOLDERS.md.
 */
import type {
  Faq,
  Intake,
  Partner,
  Post,
  Programme,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/types/content";

export const SEED_SETTINGS: SiteSettings = {
  // PLACEHOLDER: taken from the current public site. Confirm this is the
  // WhatsApp business line before launch.
  whatsappNumber: "2348131253352",
  phoneDisplay: "+234 (0) 813 125 3352",
  email: "info@nestraklinikal.com",
  address: "Ibadan, Oyo State, Nigeria",
  announcementEnabled: false,
  announcementText: "",
  announcementLink: "",
  socialLinks: [],
  legalName: "Nestra Klinikal Limited",
  rcNumber: "RC 1054356",
  completionsCount: 500,
};

export const SEED_PROGRAMMES: Programme[] = [
  {
    _id: "seed-qms-core",
    title: "Quality Management Systems & Quality Assurance",
    slug: "quality-management-systems-quality-assurance",
    category: "qms",
    level: "core",
    summary:
      "Our core certificate. Builds working competence in quality management systems and quality assurance for professionals already practising in laboratory, clinical research or regulatory roles.",
    whoItIsFor: [
      "Medical laboratory scientists",
      "Biomedical scientists",
      "Clinical research associates and site staff",
      "Quality officers in health and pharmaceutical organisations",
      "Regulatory and compliance staff",
    ],
    outcomes: [
      "Design and document a quality management system for your organisation",
      "Run process control, occurrence management and document control",
      "Define and measure quality indicators such as turnaround time",
      "Prepare a laboratory or research site for external assessment",
      "Use systems thinking and data when making operational decisions",
    ],
    curriculum: [
      {
        title: "Foundations of quality management",
        description:
          "Quality concepts, the cost of poor quality, and how a quality system differs from quality control.",
      },
      {
        title: "Documentation and document control",
        description:
          "Building the document hierarchy: policies, processes, procedures and records, and keeping them controlled.",
      },
      {
        title: "Process control and occurrence management",
        description:
          "Identifying, recording and closing out non-conformities, and preventing recurrence.",
      },
      {
        title: "Quality indicators and measurement",
        description:
          "Choosing indicators that matter, collecting the data, and using it to drive improvement.",
      },
      {
        title: "Internal audit",
        description: "Planning, conducting and reporting an internal audit against a standard.",
      },
      {
        title: "Continual improvement",
        description:
          "Management review, corrective and preventive action, and embedding improvement in daily work.",
      },
    ],
    duration: "PLACEHOLDER — confirm duration",
    deliveryMode: "blended",
    entryRequirements: [
      "A degree or diploma in a health, laboratory or life sciences discipline, or equivalent professional experience",
    ],
    certification: "Nestra Klinikal Certificate in Quality Management Systems & Quality Assurance",
    requiresSupervisedHours: false,
    feeNaira: null,
    feeUsd: null,
    featured: true,
    order: 20,
  },
  {
    _id: "seed-foundation",
    title: "Foundation Certificate in Quality Management",
    slug: "foundation-certificate-quality-management",
    category: "qms",
    level: "foundation",
    summary:
      "An entry point for professionals new to quality management, covering the principles and vocabulary needed before taking on a quality role.",
    whoItIsFor: [
      "Recent graduates in laboratory and health sciences",
      "Professionals moving into a quality role for the first time",
      "Support and operations staff in laboratories and research sites",
    ],
    outcomes: [
      "Explain the principles behind a quality management system",
      "Recognise the standards that apply to your working environment",
      "Contribute to documentation and record keeping with confidence",
    ],
    curriculum: [
      {
        title: "What quality management is",
        description: "Core concepts and why quality systems exist in regulated environments.",
      },
      {
        title: "The standards landscape",
        description: "An orientation to GCP, GMP, GLP, GCLP, ISO 15189 and ISO 17025.",
      },
      {
        title: "Working inside a quality system",
        description: "Records, procedures and your responsibilities as a team member.",
      },
    ],
    duration: "PLACEHOLDER — confirm duration",
    deliveryMode: "online-live",
    entryRequirements: ["Open to anyone working in or entering the health and research sector"],
    certification: "Nestra Klinikal Foundation Certificate in Quality Management",
    requiresSupervisedHours: false,
    feeNaira: null,
    feeUsd: null,
    featured: true,
    order: 10,
  },
  {
    _id: "seed-diploma",
    title: "Advanced Diploma in Quality Management Systems",
    slug: "advanced-diploma-quality-management-systems",
    category: "qms",
    level: "advanced",
    summary:
      "In-depth mastery for senior practitioners who will lead quality function design, audit programmes and accreditation readiness within their organisations.",
    whoItIsFor: [
      "Quality managers and heads of laboratory",
      "Senior clinical research staff",
      "Consultants advising on quality systems",
    ],
    outcomes: [
      "Lead the design and implementation of an organisation-wide quality system",
      "Run an internal audit programme against ISO 15189 or ISO 17025",
      "Prepare an organisation for accreditation assessment",
      "Mentor staff through a quality transformation",
    ],
    curriculum: [
      {
        title: "Quality system architecture",
        description: "Designing a system that fits the organisation rather than a template.",
      },
      {
        title: "ISO 15189 in depth",
        description: "Requirements for medical laboratories, clause by clause.",
      },
      {
        title: "ISO 17025 in depth",
        description: "Requirements for testing and calibration laboratories, clause by clause.",
      },
      {
        title: "Audit programme management",
        description: "Building and running an audit schedule, and managing auditor competence.",
      },
      {
        title: "Accreditation readiness",
        description: "Gap analysis, remediation planning and assessment preparation.",
      },
    ],
    duration: "PLACEHOLDER — confirm duration",
    deliveryMode: "blended",
    entryRequirements: [
      "Completion of the core QMS/QA certificate, or demonstrable equivalent experience in a quality role",
    ],
    certification: "Nestra Klinikal Advanced Diploma in Quality Management Systems",
    requiresSupervisedHours: false,
    feeNaira: null,
    feeUsd: null,
    featured: true,
    order: 30,
  },
  {
    _id: "seed-phlebotomy",
    title: "Phlebotomy Certification",
    slug: "phlebotomy-certification",
    category: "specialist",
    level: "specialist",
    summary:
      "A specialist practical certification in venous blood collection. Certification is awarded only after completing supervised practical hours.",
    whoItIsFor: [
      "Laboratory staff performing or supervising blood collection",
      "Nurses and clinical staff who draw samples",
      "Health workers moving into sample collection roles",
    ],
    outcomes: [
      "Perform venepuncture safely and competently under supervision",
      "Apply correct patient identification and sample labelling practice",
      "Handle, store and transport samples so integrity is preserved",
      "Recognise and respond to complications during collection",
    ],
    curriculum: [
      {
        title: "Anatomy and site selection",
        description: "Venous anatomy and choosing an appropriate collection site.",
      },
      {
        title: "Safety and infection prevention",
        description: "Personal protective equipment, sharps handling and exposure response.",
      },
      {
        title: "Collection technique",
        description: "Order of draw, tube selection and correct venepuncture technique.",
      },
      {
        title: "Sample integrity",
        description: "Labelling, handling, storage and transport conditions.",
      },
      {
        title: "Supervised practical hours",
        description:
          "Assessed practice under direct supervision. These hours are mandatory and must be completed before certification is awarded.",
      },
    ],
    duration: "PLACEHOLDER — confirm duration and required number of supervised hours",
    deliveryMode: "in-person",
    entryRequirements: [
      "A background in a health, nursing or laboratory discipline",
      "Ability to attend in person for the supervised practical component",
    ],
    certification: "Nestra Klinikal Phlebotomy Certificate",
    requiresSupervisedHours: true,
    feeNaira: null,
    feeUsd: null,
    featured: true,
    order: 40,
  },
  {
    _id: "seed-internal-auditor",
    title: "Internal Auditor Certification",
    slug: "internal-auditor-certification",
    category: "laboratory",
    level: "core",
    summary:
      "Equips your own staff to plan, conduct and report internal audits against the quality standards that apply to your organisation.",
    whoItIsFor: [
      "Staff nominated as internal auditors",
      "Quality officers building an audit programme",
      "Laboratory and research site supervisors",
    ],
    outcomes: [
      "Plan an audit against a defined standard and scope",
      "Gather and evaluate objective audit evidence",
      "Write findings that are clear, defensible and actionable",
      "Follow up corrective action to closure",
    ],
    curriculum: [
      { title: "Audit principles", description: "Purpose, types and the auditor's role." },
      { title: "Planning an audit", description: "Scope, criteria, checklist and schedule." },
      { title: "Conducting the audit", description: "Interviewing, sampling and evidence gathering." },
      { title: "Reporting and follow-up", description: "Writing findings and verifying closure." },
    ],
    duration: "PLACEHOLDER — confirm duration",
    deliveryMode: "online-live",
    entryRequirements: ["Working knowledge of a quality management system"],
    certification: "Nestra Klinikal Internal Auditor Certificate",
    requiresSupervisedHours: false,
    feeNaira: null,
    feeUsd: null,
    featured: false,
    order: 50,
  },
  {
    _id: "seed-gcp",
    title: "GCP Quality Assurance for Clinical Research",
    slug: "gcp-quality-assurance-clinical-research",
    category: "clinical-research",
    level: "core",
    summary:
      "Good Clinical Practice quality assurance for staff working on clinical trials and at research sites, covering site readiness and trial documentation.",
    whoItIsFor: [
      "Clinical research associates and coordinators",
      "Research site quality and regulatory staff",
      "Laboratory staff supporting clinical trials",
    ],
    outcomes: [
      "Apply GCP requirements to day-to-day site activity",
      "Maintain a trial master file that withstands inspection",
      "Prepare a research site for sponsor and regulatory audit",
    ],
    curriculum: [
      { title: "GCP principles", description: "The ethical and scientific basis of the standard." },
      { title: "Site responsibilities", description: "Investigator and site staff obligations." },
      {
        title: "Documentation and the trial master file",
        description: "What must be kept, for how long, and in what condition.",
      },
      { title: "Audit and inspection readiness", description: "Preparing for and hosting an audit." },
    ],
    duration: "PLACEHOLDER — confirm duration",
    deliveryMode: "online-live",
    entryRequirements: ["Involvement in, or intention to work in, clinical research"],
    certification: "Nestra Klinikal Certificate in GCP Quality Assurance",
    requiresSupervisedHours: false,
    feeNaira: null,
    feeUsd: null,
    featured: false,
    order: 60,
  },
];

/**
 * PLACEHOLDER: no intake dates are published because none have been confirmed.
 * The administrator adds these in Studio under Intakes.
 */
export const SEED_INTAKES: Intake[] = [];

/** Both quotes are reproduced from the current nestraklinikal.com site. */
export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    _id: "seed-testimonial-kingsley",
    name: "Kingsley Nwankwo",
    role: "Clinical trial sample management, logistics and supply chain",
    cohort: "Cohort 1 QMS/QA Class",
    quote:
      "The quality management system and Quality Assurance Training of Nestra Klinikal (NK) is so different. It's all about getting the best out of you no matter the profession you belong. This training has been the best input I had received since completing my basic degree in medical laboratory science (BMLS) education. Before taking this training, I was under employed. After the taking the NK training in QMS/QA, I have been able to get hired by different NGOs like FHI360, Catholic Caritas Foundation of Nigeria (CCFN) and Achieving Health Nigeria Initiative (AHNi) due to my acquisition of critical quality assurance skills needed to function in these organizations. From the NGO sector, I have transitioned into the Clinical Trial space where I oversee clinical trial sample management, Logistics and Supply Chain. In July 2022, I was hired by a Health organization in Republic of Ireland and the knowledge I gained during the training in QMS/QA was extremely instrumental to my success during the job interview. I strongly advise every professional seeking global relevance and a switch to take this course.",
    featured: true,
  },
  {
    _id: "seed-testimonial-georgina",
    name: "Duru Georgina",
    role: "Deputy Director, University of Abuja Teaching Hospital",
    cohort: "Cohort 1 QMS/QA Class",
    quote:
      "My training as a QMS/QA professional have really impacted my practice, my personal life and reasoning. We have started implementing what we have learnt in our laboratory, starting with documentation, process control, occurrence management and many more. We have started measuring quality indicators such as TAT and we have used them to monitor our services and clients' satisfaction. The benefits derived from the training and my practice are enormous. I plan better both at work and home using strategic planning tools learnt from QMS. I know use system thinking and data when taking decisions. QMS/QA is what every organization or company needs to satisfy their customers. The Faculty and course content were wonderful. I recommend this training to everyone and organization interested in improving their systems.",
    featured: true,
  },
];

export const SEED_PARTNERS: Partner[] = [
  {
    _id: "seed-partner-fabis",
    name: "FABIS Institute of Entrepreneurship",
    kind: "private",
    location: "Abuja, Nigeria",
    description:
      "A collaborative training partnership delivering Nestra Klinikal programmes to learners in Abuja and the surrounding region.",
  },
  {
    _id: "seed-partner-nzeribe",
    name: "Dr. B. U. Nzeribe State Polytechnic",
    kind: "state",
    location: "Awo-Omamma, Imo State",
    description:
      "An academic partnership bringing structured quality management certification pathways to polytechnic students and working professionals.",
  },
];

/**
 * PLACEHOLDER: team member profiles are not published because no verified bios,
 * names or photographs were available. Add these in Studio under Team.
 */
export const SEED_TEAM: TeamMember[] = [];

export const SEED_FAQS: Faq[] = [
  {
    _id: "seed-faq-who",
    question: "Who are these programmes for?",
    answer:
      "Health and research professionals: medical laboratory scientists, biomedical scientists, nurses, clinical research associates, pharmacists, and regulatory or quality staff. Some programmes are open to those entering the sector, and others assume existing practice. Each programme page lists its own entry requirements.",
    topic: "programmes",
  },
  {
    _id: "seed-faq-online",
    question: "Can I take a programme entirely online?",
    answer:
      "Most programmes are delivered online or blended, which means you can take part from anywhere in Nigeria or abroad. Phlebotomy is the exception: its supervised practical hours must be completed in person.",
    topic: "programmes",
  },
  {
    _id: "seed-faq-diaspora",
    question: "I am outside Nigeria. Can I still enrol?",
    answer:
      "Yes. Fees are quoted in both Naira and US dollars, and online and blended programmes are open to participants abroad. Contact us on WhatsApp and we will confirm the arrangements for your location.",
    topic: "fees",
  },
  {
    _id: "seed-faq-fees",
    question: "How much do the programmes cost?",
    answer:
      "Fees are listed on each programme page in both Naira and US dollars. Where a fee shows as available on request, contact us on WhatsApp or by email and we will send you current pricing.",
    topic: "fees",
  },
  {
    _id: "seed-faq-certificate",
    question: "What certificate will I receive?",
    answer:
      "Each programme page states exactly what Nestra Klinikal awards on successful completion. For Phlebotomy, certification is awarded only after the mandatory supervised practical hours have been completed.",
    topic: "certification",
  },
  {
    _id: "seed-faq-corporate",
    question: "Can you train our whole team?",
    answer:
      "Yes. We run in-house cohorts for organisations and design the content around the gaps identified in your own systems. Use the corporate enquiry form and tell us about your organisation and what you need.",
    topic: "corporate",
  },
];

/**
 * PLACEHOLDER: no articles are published yet. The administrator adds these in
 * Studio under Articles.
 */
export const SEED_POSTS: Post[] = [];
