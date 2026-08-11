import { groq } from "next-sanity";

const IMAGE = `"imageUrl": heroImage.asset->url, "imageAlt": heroImage.alt`;

export const PROGRAMMES_QUERY = groq`*[_type == "programme"] | order(order asc, title asc){
  _id, title, "slug": slug.current, category, level, summary,
  ${IMAGE},
  whoItIsFor, outcomes, curriculum, duration, deliveryMode, entryRequirements,
  certification, requiresSupervisedHours, feeNaira, feeUsd, feeNote, featured, order
}`;

export const PROGRAMME_BY_SLUG_QUERY = groq`*[_type == "programme" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, category, level, summary,
  ${IMAGE},
  whoItIsFor, outcomes, curriculum, body, duration, deliveryMode, entryRequirements,
  certification, requiresSupervisedHours, feeNaira, feeUsd, feeNote, featured, order,
  seoTitle, seoDescription
}`;

export const PROGRAMME_SLUGS_QUERY = groq`*[_type == "programme" && defined(slug.current)].slug.current`;

export const INTAKES_QUERY = groq`*[_type == "intake" && status != "closed"] | order(startDate asc){
  _id, startDate, applicationDeadline, mode, location, status, seatsNote,
  "programmeTitle": programme->title,
  "programmeSlug": programme->slug.current
}`;

export const INTAKES_FOR_PROGRAMME_QUERY = groq`*[_type == "intake" && programme->slug.current == $slug && status != "closed"] | order(startDate asc){
  _id, startDate, applicationDeadline, mode, location, status, seatsNote,
  "programmeTitle": programme->title,
  "programmeSlug": programme->slug.current
}`;

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"] | order(order asc){
  _id, name, role, cohort, quote, featured,
  "imageUrl": photo.asset->url
}`;

export const TEAM_QUERY = groq`*[_type == "teamMember"] | order(order asc){
  _id, name, role, group, bio, credentials, linkedin,
  "imageUrl": photo.asset->url
}`;

export const PARTNERS_QUERY = groq`*[_type == "partner"] | order(order asc){
  _id, name, kind, location, description,
  "logoUrl": logo.asset->url
}`;

export const FAQS_QUERY = groq`*[_type == "faq"] | order(order asc){
  _id, question, answer, topic
}`;

export const POSTS_QUERY = groq`*[_type == "post"] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, publishedAt,
  "coverImageUrl": coverImage.asset->url,
  "authorName": author->name
}`;

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, excerpt, publishedAt, body,
  "coverImageUrl": coverImage.asset->url,
  "authorName": author->name
}`;

export const POST_SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)].slug.current`;

export const SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  whatsappNumber, phoneDisplay, email, address,
  announcementEnabled, announcementText, announcementLink,
  socialLinks, legalName, rcNumber, completionsCount
}`;
