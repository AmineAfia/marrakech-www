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

// Test Run Schema - matches test_runs datasource
export const TestRunSchema = z.object({
	test_run_id: z.string(),
	prompt_id: z.string(),
	prompt_name: z.string(),
	total_tests: z.number().int().nonnegative(),
	passed_tests: z.number().int().nonnegative(),
	failed_tests: z.number().int().nonnegative(),
	duration_ms: z.number().int().nonnegative(),
	timestamp: z.string().datetime().transform(toUTCString),
	environment: z.enum(["local", "ci", "production"]),
	git_commit: z.string().optional(),
	account_id: z.string().optional(),
	organization_id: z.string().optional(),
});

// Test Case Schema - matches test_cases datasource
export const TestCaseSchema = z.object({
	test_case_id: z.string(),
	test_run_id: z.string(),
	prompt_id: z.string(),
	input: z.string(),
	expected_output: z.string().optional(),
	actual_output: z.string(),
	passed: z.boolean(),
	duration_ms: z.number().int().nonnegative(),
	execution_id: z.string(),
	error_message: z.string().optional(),
	timestamp: z.string().datetime().transform(toUTCString).optional(),
});

// Main ingestion request schema
export const IngestionRequestSchema = z.object({
	tool_calls: z.array(ToolCallSchema).optional().default([]),
	prompt_metadata: z.array(PromptMetadataSchema).optional().default([]),
	prompt_executions: z.array(PromptExecutionSchema).optional().default([]),
	test_runs: z.array(TestRunSchema).optional().default([]),
	test_cases: z.array(TestCaseSchema).optional().default([]),
});

export type ToolCallData = z.infer<typeof ToolCallSchema>
export type PromptMetadataData = z.infer<typeof PromptMetadataSchema>
export type PromptExecutionData = z.infer<typeof PromptExecutionSchema>
export type TestRunData = z.infer<typeof TestRunSchema>;
export type TestCaseData = z.infer<typeof TestCaseSchema>;
export type IngestionRequest = z.infer<typeof IngestionRequestSchema>
