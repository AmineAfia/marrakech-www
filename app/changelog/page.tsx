import { changelogEntries } from "@/lib/changelog-data"
import { useMemo } from "react"
import { formatDate } from "@/lib/utils"

export default function ChangelogPage() {
  const sortedChangelogs = useMemo(() => {
    return changelogEntries.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
  }, [])

  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="max-w-5xl mx-auto relative">
          <div className="p-3 flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">Changelog</h1>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-10">
        <div className="relative">
          {sortedChangelogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No changelog entries found.</p>
              <p className="text-sm text-muted-foreground mt-2">
                No changelog entries are available.
              </p>
            </div>
          ) : (
            sortedChangelogs.map((changelog, index) => {
              const date = new Date(changelog.date)
              const formattedDate = formatDate(date)
              const Content = changelog.content

              return (
                <div key={changelog.id} className="relative">
                  <div className="flex flex-col md:flex-row gap-y-6">
                    <div className="md:w-48 flex-shrink-0">
                      <div className="md:sticky md:top-8 pb-10">
                        <time className="text-sm font-medium text-muted-foreground block mb-3">
                          {formattedDate}
                        </time>

                        {changelog.version && (
                          <div className="inline-flex relative z-10 items-center justify-center w-10 h-10 text-foreground border border-border rounded-lg text-sm font-bold">
                            {changelog.version}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="flex-1 md:pl-8 relative pb-10">
                      {/* Vertical timeline line */}
                      <div className="hidden md:block absolute top-2 left-0 w-px h-full bg-border">
                        {/* Timeline dot */}
                        <div className="hidden md:block absolute -translate-x-1/2 size-3 bg-primary rounded-full z-10" />
                      </div>

                      <div className="space-y-6">
                        <div className="relative z-10 flex flex-col gap-2">
                          <h2 className="text-2xl font-semibold tracking-tight text-balance">
                            {changelog.title}
                          </h2>

                          {/* Tags */}
                          {changelog.tags &&
                            changelog.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {changelog.tags.map((tag: string) => (
                                  <span
                                    key={tag}
                                    className="h-6 w-fit px-2 text-xs font-medium bg-muted text-muted-foreground rounded-full border flex items-center justify-center"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                        </div>
                        <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance">
                          <Content />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
