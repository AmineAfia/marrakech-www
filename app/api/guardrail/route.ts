import { NextResponse } from "next/server";
import { gateway, generateObject } from "ai";
import { z } from "zod";
import { validateApiKey } from "@/lib/auth";

// Define the schema for the guardrail response
const guardrailSchema = z.object({
	passed: z.boolean().describe("Whether the content passes the rules"),
	reason: z
		.string()
		.optional()
		.describe("If failed, explanation of why it violated the rules"),
});

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

		// Extract content and rules from request body
		if (!body || typeof body !== "object" || !("content" in body) || !("rules" in body)) {
			return NextResponse.json(
				{ error: "Content and rules are required" },
				{ status: 400 },
			);
		}

		const { content, rules } = body as { content: string; rules: string };

		if (!content || typeof content !== "string" || content.trim() === "") {
			return NextResponse.json(
				{ error: "Content must be a non-empty string" },
				{ status: 400 },
			);
		}

		if (!rules || typeof rules !== "string" || rules.trim() === "") {
			return NextResponse.json(
				{ error: "Rules must be a non-empty string" },
				{ status: 400 },
			);
		}

		// Generate structured response using AI Gateway
		const result = await generateObject({
			model: gateway("xai/grok-4-fast-non-reasoning"),
			schema: guardrailSchema,
			prompt: `You are a content validation system. Evaluate if the given content follows the specified rules.

Rules: ${rules.trim()}

Content to evaluate: ${content.trim()}

Determine if the content passes or violates the rules. Set "passed" to true if it follows the rules, or false if it violates them. If it fails, provide a brief explanation in the "reason" field explaining why it violated the rules.`,
		});

		// Return structured response
		if (result.object.passed) {
			return NextResponse.json({
				passed: true,
			});
		}
		
		return NextResponse.json({
			passed: false,
			reason: result.object.reason || "Content violated rules",
		});
	} catch (error) {
		console.error("Guardrail endpoint error:", error);

		// Fail-secure approach: return error status when validation fails
		return NextResponse.json(
			{
				error: "Content validation service temporarily unavailable",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 503 },
		);
	}
}
