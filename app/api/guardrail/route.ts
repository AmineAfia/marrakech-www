import { NextResponse } from "next/server";
import { gateway, generateText } from "ai";
import { validateApiKey } from "@/lib/auth";

export async function POST(request: Request) {
	try {
		// Extract API key from headers
		const apiKey = request.headers.get("x-api-key");

		if (!apiKey) {
			return NextResponse.json({ error: "API key required" }, { status: 401 });
		}

		// Validate API key using shared utility
		const validation = await validateApiKey(apiKey);

		if (!validation.valid) {
			return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
		}

		// Parse request body
		let body: unknown;
		try {
			const text = await request.text();
			if (!text || text.trim() === "") {
				return NextResponse.json(
					{ error: "Request body is empty" },
					{ status: 400 },
				);
			}
			body = JSON.parse(text);
		} catch (error) {
			return NextResponse.json(
				{
					error: "Invalid JSON in request body",
				},
				{ status: 400 },
			);
		}

		// Extract prompt from request body
		if (!body || typeof body !== "object" || !("prompt" in body)) {
			return NextResponse.json(
				{ error: "Prompt is required" },
				{ status: 400 },
			);
		}

		const { prompt } = body as { prompt: string };

		if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
			return NextResponse.json(
				{ error: "Prompt must be a non-empty string" },
				{ status: 400 },
			);
		}

		// Generate text using AI Gateway
		const result = await generateText({
			model: gateway("xai/grok-4-fast-non-reasoning"),
			prompt: prompt.trim(),
		});

		return NextResponse.json({
			text: result.text,
			usage: result.usage,
			finishReason: result.finishReason,
		});
	} catch (error) {
		console.error("Guardrail endpoint error:", error);

		return NextResponse.json(
			{
				error: "Internal server error",
			},
			{ status: 500 },
		);
	}
}
