import { changelogEntries } from "@/lib/changelog-data"
import { createMetadata } from "@/lib/metadata"
import type { Metadata } from "next"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { entry?: string } | undefined
}): Promise<Metadata> {
  const entryId = searchParams?.entry
  
  if (entryId) {
    const changelog = changelogEntries.find(e => e.id === entryId)
    
    if (changelog) {
      return createMetadata({
        title: `${changelog.title} - Changelog`,
        description: `${changelog.description.slice(0, 160).trim()}...`,
        openGraph: {
          title: `${changelog.title} - Changelog`,
          description: `${changelog.description.slice(0, 160).trim()}...`,
          url: `https://marrakesh.dev/changelog?entry=${entryId}`,
        },
        twitter: {
          title: `${changelog.title} - Changelog`,
          description: `${changelog.description.slice(0, 160).trim()}...`,
        },
      })
    }
  }
  
  return createMetadata({
    title: "Changelog",
    description: "See what's new in Marrakesh - latest updates, features, and improvements",
  })
}

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
