import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { WrapperWithQuery } from "@/components/wrapper";
import { ConditionalLayout } from "@/components/conditional-layout";
import { BetterAuthUIProvider } from "@/components/auth-ui-provider";
import { PostHogProvider } from "@/components/posthog-provider";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
	title: {
		template: "%s | Marrakesh",
		default: "Marrakesh",
	},
	description: "Context Engineering for developers",
	metadataBase: new URL("https://marrakesh.dev"),
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon/favicon.ico" sizes="any" />
				{process.env.NEXT_PUBLIC_POSTHOG_KEY && (
					<script
						// eslint-disable-next-line react/no-danger
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{
							__html: `
								!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
								posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}', {api_host: '${process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com"}'});
							`,
						}}
					/>
				)}
			</head>
			<body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
				<ThemeProvider attribute="class" defaultTheme="dark">
					<PostHogProvider>
						<WrapperWithQuery>
							<BetterAuthUIProvider>
								<ConditionalLayout>{children}</ConditionalLayout>
							</BetterAuthUIProvider>
						</WrapperWithQuery>
					</PostHogProvider>
					<Toaster richColors closeButton />
				</ThemeProvider>
			</body>
		</html>
	);
}
