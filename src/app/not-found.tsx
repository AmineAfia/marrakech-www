import { Button } from "@/components/Button"
import { ArrowAnimated } from "@/components/ui/icons/ArrowAnimated"
import Link from "next/link"
import { DatabaseLogo } from "../../public/DatabaseLogo"
import { siteConfig } from "./siteConfig"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Link href={siteConfig.baseLinks.home}>
        <DatabaseLogo className="mt-6 h-10" />
      </Link>
      <p className="mt-6 text-4xl font-semibold text-brand sm:text-5xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-fg">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-fg-muted">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Button asChild className="group mt-8" variant="light">
        <Link href={siteConfig.baseLinks.home}>
          Go to the home page
          <ArrowAnimated
            className="stroke-fg"
            aria-hidden="true"
          />
        </Link>
      </Button>
    </div>
  )
}
