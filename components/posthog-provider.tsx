"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// PostHog will be loaded via script tag in the head
declare global {
	interface Window {
		posthog?: {
			init: (key: string, options: { api_host: string }) => void;
			capture: (event: string, properties?: Record<string, unknown>) => void;
		};
	}
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		// Initialize PostHog when available
		if (typeof window !== "undefined" && window.posthog && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
			window.posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
				api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
			});
		}
	}, []);

	useEffect(() => {
		// Track pageviews on route changes
		if (pathname && typeof window !== "undefined" && window.posthog) {
			let url = `${window.origin}${pathname}`;
			if (searchParams.toString()) {
				url = `${url}?${searchParams.toString()}`;
			}
			window.posthog.capture("$pageview", {
				$current_url: url,
			});
		}
	}, [pathname, searchParams]);

	return <>{children}</>;
}