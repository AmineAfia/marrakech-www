import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			url: "https://marrakesh.dev",
			images: override.openGraph?.images
				? override.openGraph?.images
				: "https://marrakesh.dev/og.png",
			siteName: "Marrakesh",
			...override.openGraph,
		},
		twitter: {
			card: "summary_large_image",
			creator: "@eth_chainId",
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			images: override.openGraph?.images
				? override.openGraph?.images
				: "https://marrakesh.dev/og.png",
			...override.twitter,
		},
	};
}

export const baseUrl =
	process.env.NODE_ENV === "development"
		? new URL("http://localhost:3000")
		: new URL(`https://${process.env.VERCEL_URL!}`);
