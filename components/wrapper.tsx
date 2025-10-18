"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Footer } from "./footer";

export function Wrapper(props: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex justify-center">
			<div className="absolute pointer-events-none inset-0 md:flex items-center justify-center dark:bg-black bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] hidden" />
			
			{/* Inner flex column container */}
			<div className="flex flex-col min-h-screen w-full lg:w-8/12">
				{/* Header */}
				<div className="bg-white dark:bg-black border-b py-2 flex justify-between items-center border-border z-50 px-4 md:px-1">
					<Link href="/">
						<div className="flex gap-2 cursor-pointer">
							<Logo />
							<p className="dark:text-white text-black">MARRAKESH</p>
						</div>
					</Link>
					<div className="z-50 flex items-center">
						<ThemeToggle />
					</div>
				</div>
				
				{/* Content */}
				<div className="flex-1 mt-0 lg:w-7/12 w-full mx-auto">
					{props.children}
				</div>
				
				{/* Footer */}
				<Footer variant="landing" />
			</div>
		</div>
	);
}

const queryClient = new QueryClient();

export function WrapperWithQuery(props: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	);
}
