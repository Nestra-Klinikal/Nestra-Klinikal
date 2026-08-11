import { Suspense } from "react";
import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { ProgrammeCard } from "@/features/programmes/programme-card";
import { ProgrammeFilters } from "@/features/programmes/programme-filters";
import { getProgrammes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Quality management, clinical research and laboratory quality programmes from Nestra Klinikal, covering GCP, GMP, GCLP, GLP, ISO 15189, ISO 17025 and phlebotomy.",
  alternates: { canonical: "/programmes" },
};

export default async function ProgrammesPage() {
  const programmes = await getProgrammes();

  return (
    <>
      <PageHero
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Programmes" }]}
        eyebrow="Programmes"
        title="Find the programme that fits where you are"
        lede="Filter by the standard you work to or the level you are ready for. Every programme lists its entry requirements, fees and what it certifies."
      />

      <Section>
        <div className="container">
          {/* The filter UI reads the URL, so the unfiltered grid is prerendered
              as the fallback — crawlers and slow connections still get content. */}
          <Suspense
            fallback={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {programmes.map((programme) => (
                  <ProgrammeCard key={programme._id} programme={programme} />
                ))}
              </div>
            }
          >
            <ProgrammeFilters programmes={programmes} />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
