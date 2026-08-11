/**
 * Studio renders its own full-page chrome, so it opts out of the marketing
 * site's header and footer by using its own layout.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
