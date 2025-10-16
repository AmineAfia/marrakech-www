import type {
	ToolCallData,
	PromptMetadataData,
	PromptExecutionData,
} from "./ingestion-schemas";

const TINYBIRD_BASE_URL = "https://api.us-east.aws.tinybird.co";
const TINYBIRD_TOKEN = process.env.TINYBIRD_TOKEN;

if (!TINYBIRD_TOKEN) {
	throw new Error("TINYBIRD_TOKEN environment variable is required");
}

interface TinybirdResponse {
	success: boolean;
	message?: string;
	error?: string;
}

interface IngestionResult {
	success: boolean;
	tool_calls?: TinybirdResponse;
	prompt_metadata?: TinybirdResponse;
	prompt_executions?: TinybirdResponse;
	errors?: string[];
}

/**
 * Send a single record to a specific Tinybird table
 */
async function sendSingleRecordToTinybird(
	tableName: string,
	record: Record<string, unknown>,
): Promise<TinybirdResponse> {
	try {
		const requestBody = JSON.stringify(record);

		const response = await fetch(
			`${TINYBIRD_BASE_URL}/v0/events?name=${tableName}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${TINYBIRD_TOKEN}`,
					"Content-Type": "application/json",
				},
				body: requestBody,
			},
		);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Tinybird API error: ${response.status} - ${errorText}`);
		}

		const result = await response.json();

		// Check if data was quarantined
		if (result.quarantined_rows > 0) {
			console.warn(
				"⚠️ [Tinybird Debug]",
				result.quarantined_rows,
				"rows quarantined for",
				`${tableName}. This usually means schema mismatch.`,
			);
		}

		return {
			success: true,
			message: `Successfully sent record to ${tableName}`,
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error occurred",
		};
	}
}

/**
 * Send multiple records to a specific Tinybird table (one by one)
 */
async function sendToTinybird(
	tableName: string,
	data: Record<string, unknown>[],
): Promise<TinybirdResponse> {
	if (data.length === 0) {
		return { success: true, message: "No data to send" };
	}

	const results: TinybirdResponse[] = [];
	const errors: string[] = [];

	// Send each record individually
	for (let i = 0; i < data.length; i++) {
		const result = await sendSingleRecordToTinybird(tableName, data[i]);
		results.push(result);

		if (!result.success) {
			errors.push(`Record ${i + 1}: ${result.error}`);
		}
	}

	const success = errors.length === 0;
	const successfulRecords = results.filter((r) => r.success).length;

	return {
		success,
		message: success
			? `Successfully sent ${successfulRecords}/${data.length} records to ${tableName}`
			: `Failed to send ${errors.length}/${data.length} records to ${tableName}`,
		error: errors.length > 0 ? errors.join("; ") : undefined,
	};
}

/**
 * Ingest data to all Tinybird tables
 */
export async function ingestData(
	toolCalls: ToolCallData[],
	promptMetadata: PromptMetadataData[],
	promptExecutions: PromptExecutionData[],
	userId: string,
): Promise<IngestionResult> {
	const errors: string[] = [];

	// Inject user_id into all records
	const toolCallsWithUserId = toolCalls.map((record) => ({
		...record,
		user_id: userId,
	}));
	const promptMetadataWithUserId = promptMetadata.map((record) => ({
		...record,
		user_id: userId,
	}));
	const promptExecutionsWithUserId = promptExecutions.map((record) => ({
		...record,
		user_id: userId,
	}));

	// Send to all tables in parallel
	const [toolCallsResult, promptMetadataResult, promptExecutionsResult] =
		await Promise.all([
			sendToTinybird("tool_calls", toolCallsWithUserId),
			sendToTinybird("prompt_metadata", promptMetadataWithUserId),
			sendToTinybird("prompt_executions", promptExecutionsWithUserId),
		]);

	// Collect errors
	if (!toolCallsResult.success) {
		errors.push(`Tool calls: ${toolCallsResult.error}`);
	}
	if (!promptMetadataResult.success) {
		errors.push(`Prompt metadata: ${promptMetadataResult.error}`);
	}
	if (!promptExecutionsResult.success) {
		errors.push(`Prompt executions: ${promptExecutionsResult.error}`);
	}

	const success = errors.length === 0;

	return {
		success,
		tool_calls: toolCallsResult,
		prompt_metadata: promptMetadataResult,
		prompt_executions: promptExecutionsResult,
		errors: errors.length > 0 ? errors : undefined,
	};
}
