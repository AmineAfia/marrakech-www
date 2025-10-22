import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export interface ChangelogEntry {
  id: string
  title: string
  description: string
  date: string
  version?: string
  tags?: string[]
  author: {
    name: string
    avatar?: string  // X/Twitter profile image URL
    handle?: string  // X/Twitter handle (optional)
  }
  content: () => JSX.Element
}

export const changelogEntries: ChangelogEntry[] = [
  {
    id: "2025-10-21",
    title: "Introducing Marrakesh alpha 1.0",
    description: `
    This is the start of the marrakesh project. The project is aiming to create a new standard for context engineering. 
    The anatomy of a prompt is not the text we input to an LLM, that's just the input to the LLM. 
    The anatomy of a prompt includes the job to be done, the formatting, the saveguards, the evals, the tools, the analytics, the context, the observability...
    All of these componenent have to be built, tested and maintained in an iterative way. Marrakesh is the tool that allows developers and coding agents to do this.
    `,
    date: "2025-10-21",
    version: "0.1.0.alpha.1",
    tags: ["Context Engineering", "Prompt Engineering", "Evals", "Analytics"],
    author: {
      name: "Amine Afia",
      avatar: "https://pbs.twimg.com/profile_images/1953049307923288064/VwzTJcbz_400x400.jpg",
      handle: "@eth_chainId"
    },
    content: () => (
      <>
        <img 
          src="/sdk.png" 
          alt="Marrakesh SDK" 
          className="rounded-md border mb-6"
        />
        
        <ul className="space-y-2 mb-6">
          <li><strong>First Alpha Release</strong>: Initial SDK release with core functionality: Vercel AI SDK integration, 
          structured output formatting with type safety, automatic prompt analytics/logging, vitest-style evals for prompt testing, and a straightforward API for building prompts and tools. 
          This is an alpha - expect breaking changes as we stabilize the API.</li>
        </ul>

        <Accordion type="multiple"  className="w-full not-prose">
          <AccordionItem value="item-1">
            <AccordionTrigger>Features</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <ul className="list-disc space-y-2 pl-4">
                <li><strong>AI SDK Support</strong>: Marrakesh is built on top of Vercel AI SDK and support it out of the box</li>
                <li><strong>Output Formatter</strong>: You don't have to prompt the output format of you prompt and you don't have to spend time reading LLM models guidelines to knwo the recommanded formatting of you prompt. Marrakesh prompts take care of that</li>
                <li><strong>Analytics</strong>: Be default every Marrakesh prompt comes with observability out of the box</li>
                <li><strong>Evals as prompts</strong>: Implement Evals lilke a vitest next to the prompt and tools they are testing.</li>
                <li><strong>Prompt building API</strong>: A simple API to build prompts and tools in a type safe way. </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Bug Fixes</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    )
  }
]
