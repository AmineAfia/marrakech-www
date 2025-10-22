"use client"

import { changelogEntries } from "@/lib/changelog-data"
import { useEffect, useMemo } from "react"
import { formatDate } from "@/lib/utils"

export default function ChangelogPage() {
  const sortedChangelogs = useMemo(() => {
    return changelogEntries.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
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
                <div key={changelog.id} className="relative scroll-mt-20" id={changelog.id}>
                  <div className="flex flex-col md:flex-row gap-y-6">
                    <div className="md:w-48 flex-shrink-0">
                      <div className="md:sticky md:top-8 pb-10">
                        <time className="text-sm font-medium text-muted-foreground block mb-3">
                          {formattedDate}
                        </time>

                        {changelog.version && (
                          <div className="inline-flex relative z-10 items-center justify-center min-w-10 w-auto h-10 px-2 text-foreground border border-border rounded-lg text-xs font-bold">
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
                          <h2 className="text-2xl font-semibold tracking-tight text-balance group">
                            <a 
                              href={`#${changelog.id}`}
                              className="hover:text-primary transition-colors flex items-center gap-2"
                            >
                              {changelog.title}
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
                                #
                              </span>
                            </a>
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

                        {/* Author section */}
                        <div className="border-t border-border/50">
                          <a 
                            href={`https://twitter.com/${changelog.author.handle?.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                          >
                            <span>{changelog.author.name}</span>
                            {changelog.author.handle && (
                              <span>({changelog.author.handle})</span>
                            )}
                          </a>
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
