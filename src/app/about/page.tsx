import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHead } from "@/components/shared/section";
import { getSettings, getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Nestra Klinikal Limited is a Clinical Research and Quality Management Systems organisation incorporated in Nigeria in 2012 and operating since 2018 from Ibadan, Oyo State.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { letter: "N", word: "Noble", line: "We hold ourselves to the standard we teach." },
  { letter: "E", word: "Empathic", line: "We understand the pressure your team works under." },
  { letter: "S", word: "Sincere", line: "We tell you what your system actually needs." },
  { letter: "T", word: "Truthful", line: "Findings are evidence-based, never convenient." },
  { letter: "R", word: "Reliable", line: "What we commit to is what we deliver." },
  { letter: "A", word: "Authentic", line: "Our faculty teach from real practice." },
];

const GROUP_LABELS: Record<string, string> = {
  leadership: "Leadership",
  faculty: "Faculty",
  operations: "Operations",
};

export default async function AboutPage() {
  const [team, settings] = await Promise.all([getTeam(), getSettings()]);
  const completions = settings.completionsCount;

  return (
    <>
      <PageHero
        breadcrumb={[{ href: "/", label: "Home" }, { label: "About" }]}
        eyebrow="About us"
        title="A quality organisation, teaching quality"
        lede="Nestra Klinikal Limited is a Clinical Research and Quality Management Systems organisation based in Ibadan, Oyo State."
      />

      <Section>
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionHead eyebrow="Our story" title="Built on practice, not theory" />
            <div className="flex flex-col gap-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
              <p>
                Nestra Klinikal (NK) is a Clinical Research and Quality Management System
                Organisation incorporated in the Federal Republic of Nigeria in 2012, which began
                operations in November 2018.
              </p>
              <p>
                Driven by extensive experience, international training and exposure, and a
                commitment to developing and implementing quality systems, we help organisations,
                institutions, clinical research sites, medical diagnostic laboratories,
                pharmaceutical companies and associated agencies reach their quality management and
                quality assurance goals.
              </p>
              <p>
                We do this through gap analysis, training, organisation-focused programmes built to
                close identified gaps, auditing, mentoring, monitoring and evaluation — across GCP
                Quality Assurance, GMP, validation and verification, GCLP, GLP, ISO 15189 and ISO
                17025 quality systems.
              </p>
            </div>
          </div>

          <dl className="grid h-fit gap-4 sm:grid-cols-2">
            <Stat label="Incorporated" value="2012" />
            <Stat label="Operating since" value="2018" />
            {completions ? (
              <Stat label="Training completions" value={`${completions.toLocaleString("en-NG")}+`} />
            ) : null}
            <Stat label="Quality systems covered" value="7" />
          </dl>
        </div>
      </Section>

      <Section tone="surface">
        <div className="container">
          <SectionHead
            align="center"
            eyebrow="Our core values"
            title="What NESTRA stands for"
            lede="Six commitments, one per letter of our name."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <li key={value.letter} className="rounded-xl border border-border bg-card p-6">
                <span className="flex size-10 items-center justify-center rounded-lg bg-brand font-display text-lg font-extrabold text-brand-foreground">
                  {value.letter}
                </span>
                <p className="mt-4 font-bold">{value.word}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{value.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="container">
          <SectionHead
            eyebrow="Our people"
            title="Faculty and leadership"
            lede="Our faculty teach from current practice in laboratory quality, clinical research and pharmaceutical quality systems."
          />

          {team.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <article key={member._id} className="rounded-xl border border-border bg-card p-6">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt=""
                      width={72}
                      height={72}
                      className="size-18 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex size-16 items-center justify-center rounded-full bg-brand font-display text-lg font-bold text-brand-foreground"
                    >
                      {member.name
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((p) => p[0])
                        .join("")}
                    </span>
                  )}
                  <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
                  <p className="mt-0.5 text-sm text-accent">{member.role}</p>
                  {member.group ? (
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                      {GROUP_LABELS[member.group]}
                    </p>
                  ) : null}
                  {member.bio ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {member.bio}
                    </p>
                  ) : null}
                  {member.credentials?.length ? (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {member.credentials.map((credential) => (
                        <li
                          key={credential}
                          className="rounded-full bg-secondary px-2.5 py-1 text-[0.6875rem] font-semibold"
                        >
                          {credential}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center">
              <p className="font-semibold">Team profiles are being finalised</p>
              <p className="mx-auto mt-2 max-w-[46ch] text-sm text-muted-foreground">
                Individual faculty and leadership profiles will be published here. In the meantime,
                contact us and we will tell you who leads the programme you are considering.
              </p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-display text-3xl font-extrabold tabular text-accent">{value}</dd>
    </div>
  );
}
