"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Home, Twitter } from "lucide-react";

interface GlobalErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
	return (
		<html lang="en">
			<head>
				<title>Error | Marrakesh</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body className="bg-background text-foreground font-sans">
				<main className="flex flex-col items-center justify-center min-h-screen p-4">
					<Card className="w-full max-w-md">
						<CardHeader className="text-center">
							<CardTitle className="text-2xl font-bold text-destructive">
								Something went wrong
							</CardTitle>
							<CardDescription className="text-lg">
								An unexpected error occurred
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="text-center space-y-2">
								<p className="text-muted-foreground">
									If this problem persists, feel free to reach out to me on X
								</p>
							</div>
							
							<div className="flex flex-col gap-3">
								<a 
									href="https://x.com/eth_chainId" 
									target="_blank"
									rel="noopener noreferrer"
									className="w-full"
								>
									<Button variant="outline" className="w-full">
										<Twitter className="w-4 h-4 mr-2" />
										@eth_chainId
									</Button>
								</a>
								
								<div className="flex gap-3">
									<Button 
										variant="outline" 
										onClick={reset}
										className="flex-1"
									>
										Try again
									</Button>
									
									<a href="/" className="flex-1">
										<Button className="w-full">
											<Home className="w-4 h-4 mr-2" />
											Go Home
										</Button>
									</a>
								</div>
							</div>
						</CardContent>
					</Card>
				</main>
			</body>
		</html>
	);
}
