import type { SchemaTypeDefinition } from "sanity";

import { programme } from "./programme";
import { intake } from "./intake";
import { lead } from "./lead";
import { siteSettings } from "./site-settings";
import { faq, partner, post, teamMember, testimonial } from "./content";

export const schemaTypes: SchemaTypeDefinition[] = [
  programme,
  intake,
  testimonial,
  teamMember,
  partner,
  faq,
  post,
  lead,
  siteSettings,
];
