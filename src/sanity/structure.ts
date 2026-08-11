import type { StructureResolver } from "sanity/structure";
import {
  Building2,
  CalendarDays,
  GraduationCap,
  HelpCircle,
  Mail,
  Newspaper,
  Quote,
  Settings,
  Users,
} from "lucide-react";

/**
 * Studio navigation. Ordered by how often the administrator needs each thing,
 * with the single Site settings document pinned as a singleton so there is
 * never more than one of it.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Nestra Klinikal")
    .items([
      S.listItem()
        .title("Programmes")
        .icon(GraduationCap)
        .child(S.documentTypeList("programme").title("Programmes")),
      S.listItem()
        .title("Intakes")
        .icon(CalendarDays)
        .child(S.documentTypeList("intake").title("Intakes")),
      S.divider(),
      S.listItem()
        .title("Email leads")
        .icon(Mail)
        .child(
          S.documentTypeList("lead")
            .title("Email leads")
            .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Testimonials")
        .icon(Quote)
        .child(S.documentTypeList("testimonial").title("Testimonials")),
      S.listItem()
        .title("Team")
        .icon(Users)
        .child(S.documentTypeList("teamMember").title("Team")),
      S.listItem()
        .title("Partners")
        .icon(Building2)
        .child(S.documentTypeList("partner").title("Partners")),
      S.listItem()
        .title("FAQs")
        .icon(HelpCircle)
        .child(S.documentTypeList("faq").title("FAQs")),
      S.listItem()
        .title("Articles")
        .icon(Newspaper)
        .child(S.documentTypeList("post").title("Articles")),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .icon(Settings)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings").title("Site settings"),
        ),
    ]);
