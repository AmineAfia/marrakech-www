import type {
	ToolCallData,
	PromptMetadataData,
	PromptExecutionData,
	TestRunData,
	TestCaseData,
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
	test_runs?: TinybirdResponse;
	test_cases?: TinybirdResponse;
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

		// Check if response has content before parsing JSON
		const responseText = await response.text();
		if (!responseText.trim()) {
			// Empty response - this might be expected for some Tinybird endpoints
			return {
				success: true,
				message: `Successfully sent record to ${tableName}`,
			};
		}

		// Try to parse as JSON, but handle non-JSON responses gracefully
		let result: { quarantined_rows?: number } | null;
		try {
			result = JSON.parse(responseText);
		} catch (parseError) {
			// If it's not JSON, treat it as a successful response with the text as message
			console.warn(`[Tinybird] Non-JSON response from ${tableName}:`, responseText);
			return {
				success: true,
				message: `Successfully sent record to ${tableName} (non-JSON response)`,
			};
		}

		// Check if data was quarantined
		if (result?.quarantined_rows && result.quarantined_rows > 0) {
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
 * Send a batch of records to a specific Tinybird table using NDJSON format
 */
async function sendBatchToTinybird(
	tableName: string,
	data: Record<string, unknown>[],
): Promise<TinybirdResponse> {
	try {
		// Convert array to NDJSON format (newline-delimited JSON)
		const ndjson = data.map((record) => JSON.stringify(record)).join("\n");

		const response = await fetch(
			`${TINYBIRD_BASE_URL}/v0/events?name=${tableName}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${TINYBIRD_TOKEN}`,
					"Content-Type": "application/json",
				},
				body: ndjson,
			},
		);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Tinybird API error: ${response.status} - ${errorText}`);
		}

		// Check if response has content before parsing JSON
		const responseText = await response.text();
		if (!responseText.trim()) {
			// Empty response - this might be expected for some Tinybird endpoints
			return {
				success: true,
				message: `Successfully sent batch of ${data.length} records to ${tableName}`,
			};
		}

		// Try to parse as JSON, but handle non-JSON responses gracefully
		let result: { quarantined_rows?: number } | null;
		try {
			result = JSON.parse(responseText);
		} catch (parseError) {
			// If it's not JSON, treat it as a successful response with the text as message
			console.warn(`[Tinybird] Non-JSON response from ${tableName}:`, responseText);
			return {
				success: true,
				message: `(non-JSON response) ⚠️ sent batch of ${data.length} records to ${tableName}`,
			};
		}

		// Check if data was quarantined
		if (result?.quarantined_rows && result.quarantined_rows > 0) {
			console.warn(
				"⚠️ [Tinybird Debug]",
				result.quarantined_rows,
				"rows quarantined for",
				`${tableName}. This usually means schema mismatch.`,
			);
		}

		return {
			success: true,
			message: `Successfully sent batch of ${data.length} records to ${tableName}`,
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error occurred",
		};
	}
}

/**
 * Send multiple records to a specific Tinybird table (batch first, then fallback to individual)
 */
async function sendToTinybird(
	tableName: string,
	data: Record<string, unknown>[],
): Promise<TinybirdResponse> {
	if (data.length === 0) {
		return { success: true, message: "No data to send" };
	}

	// First attempt: try batch submission
	console.log(
		`[Tinybird] Attempting batch submission for ${tableName} (${data.length} records)`,
	);
	const batchResult = await sendBatchToTinybird(tableName, data);

	if (batchResult.success) {
		console.log(`[Tinybird] Batch submission successful for ${tableName}`);
		return batchResult;
	}

	// Fallback: send each record individually
	console.warn(
		`[Tinybird] Batch submission failed for ${tableName}, falling back to individual records. Error: ${batchResult.error}`,
	);

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
			? `Successfully sent ${successfulRecords}/${data.length} records to ${tableName} (fallback mode)`
			: `Failed to send ${errors.length}/${data.length} records to ${tableName} (fallback mode)`,
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
		testRuns: TestRunData[],
		testCases: TestCaseData[],
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
		const testRunsWithUserId = testRuns.map((record) => ({
			...record,
			user_id: userId,
		}));
		const testCasesWithUserId = testCases.map((record) => ({
			...record,
			user_id: userId,
		}));

		// Log test data being processed
		if (testRuns.length > 0) {
			console.log(`[Ingestion] Processing ${testRuns.length} test runs for user ${userId}`);
		}
		if (testCases.length > 0) {
			console.log(`[Ingestion] Processing ${testCases.length} test cases for user ${userId}`);
		}

		// Send to all tables in parallel
		const [
			toolCallsResult,
			promptMetadataResult,
			promptExecutionsResult,
			testRunsResult,
			testCasesResult,
		] = await Promise.all([
			sendToTinybird("tool_calls", toolCallsWithUserId),
			sendToTinybird("prompt_metadata", promptMetadataWithUserId),
			sendToTinybird("prompt_executions", promptExecutionsWithUserId),
			sendToTinybird("test_runs", testRunsWithUserId),
			sendToTinybird("test_cases", testCasesWithUserId),
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
		if (!testRunsResult.success) {
			errors.push(`Test runs: ${testRunsResult.error}`);
			console.error(`[Ingestion] Test runs ingestion failed: ${testRunsResult.error}`);
		} else if (testRuns.length > 0) {
			console.log(`[Ingestion] Test runs ingestion successful: ${testRunsResult.message}`);
		}
		if (!testCasesResult.success) {
			errors.push(`Test cases: ${testCasesResult.error}`);
			console.error(`[Ingestion] Test cases ingestion failed: ${testCasesResult.error}`);
		} else if (testCases.length > 0) {
			console.log(`[Ingestion] Test cases ingestion successful: ${testCasesResult.message}`);
		}

		const success = errors.length === 0;

		return {
			success,
			tool_calls: toolCallsResult,
			prompt_metadata: promptMetadataResult,
			prompt_executions: promptExecutionsResult,
			test_runs: testRunsResult,
			test_cases: testCasesResult,
			errors: errors.length > 0 ? errors : undefined,
		};
	}
