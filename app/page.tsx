"use client";

import { SignInFallbackClient } from "@/components/sign-in-fallback-client";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/blocks/hero";
import FeaturesSectionDemo from "@/components/features-section-demo-3";

export default function Home() {
	return (
		<div className="relative">
			{/* Hero Section */}
			<Hero
				title="Context Engineering for developers"
				subtitle="Build, test and analyse agents behaviour using marrakesh prompts"
				titleClassName="text-5xl md:text-7xl font-bold tracking-tight"
				subtitleClassName="text-lg md:text-xl text-muted-foreground max-w-2xl"
				gradient={true}
				blur={true}
				className="pt-16"
			>
				{/* Badge */}
				{/* <div className="mb-4 flex justify-center">
					<div className={cn(
						"group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 inline-block"
					)}>
						<AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 mx-auto max-w-none">
							<span>✨ For developers building with AI</span>
							<ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
						</AnimatedShinyText>
					</div>
				</div> */}

				{/* Custom Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
					<SignInFallbackClient />
					<Button variant="outline" size="lg" asChild>
						<a href="https://github.com/AmineAfia/marrakech" target="_blank" rel="noopener noreferrer">
							Documentation
						</a>
					</Button>
				</div>

				{/* Works with Section */}
				<div>
					<p className="text-sm text-muted-foreground mb-4">Works with</p>
					<div className="flex justify-center items-center gap-6 opacity-60">
						<div className="text-sm font-mono">Vercel AI SDK</div>
						<div className="text-sm font-mono">OpenAI (soon)</div>
						<div className="text-sm font-mono">Anthropic (soon)</div>
						<div className="text-sm font-mono">Langchain (soon)</div>
					</div>
				</div>
			</Hero>

			{/* Problem Visual */}
			{/* <section className="py-24 px-4">
				<div className="max-w-7xl mx-auto">
					<Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
						<CardContent className="p-0">
							<CodeComparison
								beforeCode={`// Messy system prompt
const prompt = \`You are a weather assistant.
You can call getWeather(city: string, units: 'celsius' | 'fahrenheit').
Return JSON: {temp: number, conditions: string}\`;

// Tools scattered across files
// Zero visibility into production`}
								afterCode={`const weatherBot = prompt('You are a weather assistant')
  .tool(getWeather)
  .output(z.object({ temp: z.number(), conditions: z.string() }));

// Clean, type-safe, observable`}
								language="typescript"
								filename="weather-bot.ts"
								lightTheme="github-light"
								darkTheme="github-dark"
								highlightColor="rgba(101, 117, 133, 0.16)"
							/>
						</CardContent>
					</Card>
					<p className="text-center text-xl font-semibold mt-8">
						From chaos to clarity in one line of code
					</p>
				</div>
			</section> */}

			{/* Features Section */}
			<FeaturesSectionDemo />

			{/* Final CTA */}
			<section className="py-32 px-4">
				<div className="text-center max-w-7xl mx-auto">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						For you and your coding agents
					</h2>
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
						<SignInFallbackClient />
					</div>
				</div>
			</section>
		</div>
	);
}
