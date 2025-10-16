import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { WrapperWithQuery } from "@/components/wrapper";
import { ConditionalLayout } from "@/components/conditional-layout";
import { BetterAuthUIProvider } from "@/components/auth-ui-provider";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
	title: {
		template: "%s | Marrakech",
		default: "Marrakech",
	},
	description: "Marrakech is a platform for building AI-powered applications",
	metadataBase: new URL("https://marrakech.dev"),
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
			</head>
			<body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
				<ThemeProvider attribute="class" defaultTheme="dark">
					<WrapperWithQuery>
						<BetterAuthUIProvider>
							<ConditionalLayout>{children}</ConditionalLayout>
						</BetterAuthUIProvider>
					</WrapperWithQuery>
					<Toaster richColors closeButton />
				</ThemeProvider>
			</body>
		</html>
	);
}
