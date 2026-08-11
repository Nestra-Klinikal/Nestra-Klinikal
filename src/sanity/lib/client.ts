import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

/**
 * Read-only client used by the public site. Null until Sanity is configured.
 *
 * Client creation is guarded because it runs at module scope: an unhandled
 * throw here would fail the production build outright rather than letting the
 * site fall back to seed content.
 */
function createReadClient() {
  if (!isSanityConfigured) return null;

  try {
    return createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    });
  } catch (error) {
    console.error(
      "[sanity] Could not create the read client; falling back to seed content:",
      error,
    );
    return null;
  }
}

export const sanityClient = createReadClient();

/**
 * Write client for lead capture. Requires SANITY_API_WRITE_TOKEN, which must
 * never be exposed to the browser — it is read on the server only.
 */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim().replace(/^['"]|['"]$/g, "");
  if (!isSanityConfigured || !token) return null;

  try {
    return createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
    });
  } catch (error) {
    console.error("[sanity] Could not create the write client:", error);
    return null;
  }
}
