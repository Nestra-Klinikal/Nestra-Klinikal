import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { NewsletterForm } from "@/features/leads/newsletter-form";
import { getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Articles and guidance on quality management systems, clinical research and laboratory accreditation from the Nestra Klinikal faculty.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        breadcrumb={[{ href: "/", label: "Home" }, { label: "Resources" }]}
        eyebrow="Resources"
        title="Guidance from our faculty"
        lede="Practical writing on quality management, accreditation and building a career in clinical research and laboratory quality."
      />

      <Section>
        <div className="container">
          {posts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] bg-secondary">
                    {post.coverImageUrl ? (
                      <Image
                        src={post.coverImageUrl}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="size-full bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)/0.6))]"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs uppercase tracking-wide text-muted-foreground"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                    <h2 className="text-lg font-bold leading-snug">
                      <Link href={`/resources/${post.slug}`} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt ? (
                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-xl border border-dashed border-border p-10 text-center">
              <h2 className="text-lg font-bold">Articles are on the way</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We are preparing practical guidance on quality systems and accreditation. Join the
                list and we will tell you when the first pieces are published.
              </p>
              <NewsletterForm
                className="mt-6 text-left"
                idPrefix="resources-newsletter"
                submitLabel="Notify me"
                successMessage="We will let you know when new articles are published."
              />
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
