import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { getPostBySlug, getPostSlugs } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/resources/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${SITE_URL}/resources/${post.slug}`,
      publishedTime: post.publishedAt,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.coverImageUrl ? { image: post.coverImageUrl } : {}),
    ...(post.authorName ? { author: { "@type": "Person", name: post.authorName } } : {}),
    publisher: { "@type": "Organization", name: "Nestra Klinikal", url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <PageHero
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/resources", label: "Resources" },
          { label: post.title },
        ]}
        title={post.title}
        lede={post.excerpt}
      />

      <Section>
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground">
              {[formatDate(post.publishedAt), post.authorName].filter(Boolean).join(" · ")}
            </p>

            {post.coverImageUrl ? (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-border">
                <Image
                  src={post.coverImageUrl}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            ) : null}

            {post.body?.length ? (
              <div className="prose-nk mt-10">
                <PortableText value={post.body} />
              </div>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  );
}
