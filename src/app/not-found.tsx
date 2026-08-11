import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-eyebrow font-bold uppercase text-signal">Page not found</p>
      <h1 className="mt-4 text-display-lg">We could not find that page</h1>
      <p className="mt-4 max-w-[46ch] text-muted-foreground">
        The link may be out of date, or the page may have moved. Our programmes are a good place to
        pick up from.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/programmes">Browse programmes</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
