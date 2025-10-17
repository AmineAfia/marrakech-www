import { z } from 'zod'

// Helper function to convert any valid datetime string to UTC ISO 8601
const toUTCString = (dateStr: string): string => {
	const date = new Date(dateStr);
	if (Number.isNaN(date.getTime())) {
		throw new Error(`Invalid date format: ${dateStr}`);
	}
	return date.toISOString();
};

// Tool Call Schema - matches tool_calls datasource
export const ToolCallSchema = z.object({
	cost_usd: z.number(),
	execution_id: z.string(),
	execution_time_ms: z.number(),
	input_tokens: z.number(),
	output_tokens: z.number(),
	prompt_id: z.string(),
	status: z.string(),
	tool_call_id: z.string(),
	tool_call_timestamp: z.string().datetime().transform(toUTCString).optional(), // Convert to UTC ISO 8601
	tool_name: z.string(),
	error_message: z.string().nullable().optional(),
});

// Prompt Metadata Schema - matches prompt_metadata datasource
export const PromptMetadataSchema = z.object({
	account_id: z.string(),
	created_at: z.string().datetime().transform(toUTCString).optional(),
	description: z.string(),
	is_active: z.number().min(0).max(1),
	name: z.string(),
	organization_id: z.string(),
	prompt_id: z.string(),
	prompt_text: z.string(),
	updated_at: z.string().datetime().transform(toUTCString),
	version: z.string(),
});

// Prompt Execution Schema - matches prompt_executions datasource
export const PromptExecutionSchema = z.object({
	account_id: z.string(),
	cost_usd: z.number(),
	execution_id: z.string(),
	execution_time_ms: z.number(),
	execution_timestamp: z.string().datetime().transform(toUTCString).optional(),
	model: z.string(),
	organization_id: z.string(),
	prompt_id: z.string(),
	prompt_name: z.string(),
	prompt_version: z.string(),
	region: z.string(),
	request_tokens: z.number(),
	response_tokens: z.number(),
	session_id: z.string(),
	status: z.string(),
	error_message: z.string().nullable().optional(),
});

// Main ingestion request schema
export const IngestionRequestSchema = z.object({
  tool_calls: z.array(ToolCallSchema).optional().default([]),
  prompt_metadata: z.array(PromptMetadataSchema).optional().default([]),
  prompt_executions: z.array(PromptExecutionSchema).optional().default([]),
})

export type ToolCallData = z.infer<typeof ToolCallSchema>
export type PromptMetadataData = z.infer<typeof PromptMetadataSchema>
export type PromptExecutionData = z.infer<typeof PromptExecutionSchema>
export type IngestionRequest = z.infer<typeof IngestionRequestSchema>
