"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Home, Twitter } from "lucide-react";

export default function NotFound() {
	return (
		<main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-4xl font-bold text-muted-foreground">404</CardTitle>
					<CardDescription className="text-lg">
						Page not found
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="text-center space-y-2">
						<p className="text-muted-foreground">
							The page you're looking for doesn't exist or has been moved.
						</p>
						<p className="text-sm text-muted-foreground">
							If you need help, feel free to reach out to me on X
						</p>
					</div>
					
					<div className="flex flex-col gap-3">
						<Link 
							href="https://x.com/eth_chainId" 
							target="_blank"
							className="w-full"
						>
							<Button variant="outline" className="w-full">
								<Twitter className="w-4 h-4 mr-2" />
								@eth_chainId
							</Button>
						</Link>
						
						<Link href="/" className="w-full">
							<Button className="w-full">
								<Home className="w-4 h-4 mr-2" />
								Go Home
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
