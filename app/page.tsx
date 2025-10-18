"use client";

import { SignInFallbackClient } from "@/components/sign-in-fallback-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { CodeComparison } from "@/components/ui/code-comparison";
import { Code2, Eye, Heart, ArrowRight, Copy, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
	return (
		<div className="relative">
			{/* Hero Section */}
			<section className="min-h-[90vh] flex flex-col items-center justify-center px-6">
				<div className="max-w-4xl mx-auto text-center">
					<div className="mb-4 flex justify-center">
						<div className={cn(
							"group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 inline-block"
						)}>
							<AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 mx-auto max-w-none">
								<span>✨ For developers building with AI</span>
								<ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
							</AnimatedShinyText>
						</div>
					</div>
					<h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
						Stop debugging AI in the dark
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Your AI makes dozens of decisions per conversation. Tool calls, structured outputs, prompt variations. See them all.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
						<SignInFallbackClient />
						<Button variant="outline" size="lg">
							View Demo
						</Button>
					</div>
					
					{/* Integration badges */}
					<div className="mb-12">
						<p className="text-sm text-muted-foreground mb-4">Works with</p>
						<div className="flex justify-center items-center gap-6 opacity-60">
							<div className="text-sm font-mono">Vercel AI SDK</div>
							<div className="text-sm font-mono">OpenAI</div>
							<div className="text-sm font-mono">Anthropic</div>
							<div className="text-sm font-mono">Next.js</div>
						</div>
					</div>

					{/* Hero Visual */}
					<div className="relative max-w-4xl mx-auto">
						<Card className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
							<CardContent className="p-8 h-full flex items-center justify-center">
								<div className="text-center">
									<div className="text-4xl mb-4">📊</div>
									<p className="text-lg text-muted-foreground">Dashboard Preview</p>
									<p className="text-sm text-muted-foreground mt-2">Real-time AI execution tracking</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Problem Visual */}
			<section className="py-24 px-6">
				<div className="max-w-6xl mx-auto">
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
			</section>

			{/* Three Benefits */}
			<section className="py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-3 gap-8">
						<Card className="transition-all hover:scale-105">
							<CardHeader className="text-center">
								<Code2 className="h-12 w-12 mx-auto mb-4 text-primary" />
								<CardTitle>Write AI code that makes sense</CardTitle>
								<CardDescription>
									Type-safe tools. Clean prompts. Works everywhere.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="transition-all hover:scale-105">
							<CardHeader className="text-center">
								<Eye className="h-12 w-12 mx-auto mb-4 text-primary" />
								<CardTitle>Know what your AI is doing</CardTitle>
								<CardDescription>
									Every tool call, every execution, every token. Tracked automatically.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="transition-all hover:scale-105">
							<CardHeader className="text-center">
								<Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
								<CardTitle>Build AI users actually love</CardTitle>
								<CardDescription>
									See what works. Fix what doesn't. Ship faster.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* Code Example */}
			<section className="py-24 px-6 bg-muted/30">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-8">
						Code that makes developers go "wow"
					</h2>
					<div className="bg-black text-white rounded-lg p-6 text-left overflow-x-auto">
						<pre className="text-sm">
							<code>
								<span className="text-purple-400">const</span>{" "}
								<span className="text-blue-300">weatherBot</span> ={" "}
								<span className="text-yellow-300">prompt</span>
								<span className="text-gray-400">(</span>
								<span className="text-green-300">'You are a weather assistant'</span>
								<span className="text-gray-400">)</span>
								{"\n  "}.<span className="text-yellow-300">tool</span>
								<span className="text-gray-400">(</span>getWeather
								<span className="text-gray-400">)</span>
								{"\n  "}.<span className="text-yellow-300">output</span>
								<span className="text-gray-400">(</span>
								<span className="text-blue-300">z</span>.<span className="text-yellow-300">object</span>
								<span className="text-gray-400">{"{"}</span>
								{"\n    "}<span className="text-blue-300">temp</span>: <span className="text-blue-300">z</span>.<span className="text-yellow-300">number</span>
								<span className="text-gray-400">(),</span>
								{"\n    "}<span className="text-blue-300">conditions</span>: <span className="text-blue-300">z</span>.<span className="text-yellow-300">string</span>
								<span className="text-gray-400">()</span>
								{"\n  "}<span className="text-gray-400">{"}"}</span>
								<span className="text-gray-400">);</span>
								{"\n\n"}
								<span className="text-gray-500">{/* That's it. Clean, type-safe, observable. */}</span>
							</code>
						</pre>
					</div>
					<p className="text-muted-foreground mt-4">
						No more stuffing schemas into system prompts. No more guessing in production.
					</p>
				</div>
			</section>

			{/* Dashboard Preview */}
			<section className="py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							See everything happening in your AI application
						</h2>
						<p className="text-lg text-muted-foreground">
							Real-time monitoring, performance insights, and error tracking
						</p>
					</div>
					
					<Card className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
						<CardContent className="p-8 h-full flex items-center justify-center relative">
							<div className="text-center">
								<div className="text-6xl mb-4">📊</div>
								<p className="text-xl font-semibold mb-2">Live Dashboard</p>
								<p className="text-muted-foreground mb-6">
									Track executions, tool calls, and performance metrics
								</p>
								<div className="flex justify-center gap-4 text-sm">
									<Badge variant="secondary">See every execution in real-time</Badge>
									<Badge variant="secondary">Track tool performance</Badge>
									<Badge variant="secondary">Catch errors before users do</Badge>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-32 px-6">
				<div className="text-center max-w-2xl mx-auto">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Start seeing your AI in production
					</h2>
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
						<SignInFallbackClient />
					</div>
					<p className="text-xs text-muted-foreground">
						npm install marrakech-sdk • Free tier available
					</p>
				</div>
			</section>
		</div>
	);
}
