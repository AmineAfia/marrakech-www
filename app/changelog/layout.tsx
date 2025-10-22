import { changelogEntries, extractFirstImage } from "@/lib/changelog-data"
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
      const imageUrl = extractFirstImage(changelog)
      const fullImageUrl = imageUrl?.startsWith('http') 
        ? imageUrl 
        : `https://marrakesh.dev${imageUrl}`
      
      return createMetadata({
        title: `${changelog.title} • Marrakesh`,
        description: `${changelog.description.slice(0, 160).trim()}...`,
        openGraph: {
          title: `${changelog.title} • Marrakesh`,
          description: `${changelog.description.slice(0, 160).trim()}...`,
          url: `https://marrakesh.dev/changelog?entry=${entryId}`,
          images: fullImageUrl || 'https://marrakesh.dev/og.png',
        },
        twitter: {
          title: `${changelog.title} • Marrakesh`,
          description: `${changelog.description.slice(0, 160).trim()}...`,
          images: fullImageUrl || 'https://marrakesh.dev/og.png',
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
