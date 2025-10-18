"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";

export function SignInFallbackClient() {
	const { data: session, isPending } = useSession();
	const isSignedIn = !!session?.user;
	
	return (
		<Link
			href={isSignedIn ? "/dashboard" : "/sign-in"}
			className="flex justify-center"
		>
			<Button className="gap-2 justify-between" variant="default">
				{!isSignedIn ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.2em"
						height="1.2em"
						viewBox="0 0 24 24"
						aria-label="Sign in icon"
					>
						<title>Sign in icon</title>
						<path
							fill="currentColor"
							d="M5 3H3v4h2V5h14v14H5v-2H3v4h18V3zm12 8h-2V9h-2V7h-2v2h2v2H3v2h10v2h-2v2h2v-2h2v-2h2z"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.2em"
						height="1.2em"
						viewBox="0 0 24 24"
						aria-label="Dashboard icon"
					>
						<title>Dashboard icon</title>
						<path fill="currentColor" d="M2 3h20v18H2zm18 16V7H4v12z" />
					</svg>
				)}
				<span>{isSignedIn ? "Dashboard" : "Sign In"}</span>
			</Button>
		</Link>
	);
}
