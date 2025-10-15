import type { ToolCallData, PromptMetadataData, PromptExecutionData } from './ingestion-schemas'

const TINYBIRD_BASE_URL = 'https://api.us-east.aws.tinybird.co'
const TINYBIRD_TOKEN = process.env.TINYBIRD_TOKEN

if (!TINYBIRD_TOKEN) {
  throw new Error('TINYBIRD_TOKEN environment variable is required')
}

interface TinybirdResponse {
  success: boolean
  message?: string
  error?: string
}

interface IngestionResult {
  success: boolean
  tool_calls?: TinybirdResponse
  prompt_metadata?: TinybirdResponse
  prompt_executions?: TinybirdResponse
  errors?: string[]
}

/**
 * Send a single record to a specific Tinybird table
 */
async function sendSingleRecordToTinybird(
  tableName: string,
  record: Record<string, unknown>
): Promise<TinybirdResponse> {
  console.log('🔍 [Tinybird Debug] Sending single record to table:', tableName)
  console.log('🔍 [Tinybird Debug] Record:', JSON.stringify(record, null, 2))
  console.log('🔍 [Tinybird Debug] All columns:', Object.keys(record))

  try {
    const requestBody = JSON.stringify(record)
    console.log('🔍 [Tinybird Debug] Request body length:', requestBody.length, 'characters')
    
    const response = await fetch(`${TINYBIRD_BASE_URL}/v0/events?name=${tableName}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TINYBIRD_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })

    console.log('🔍 [Tinybird Debug] Response status for', tableName + ':', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ [Tinybird Debug] Error for', tableName + ':', errorText)
      throw new Error(`Tinybird API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('✅ [Tinybird Debug] Success for', tableName + ':', result)
    
    // Check if data was quarantined
    if (result.quarantined_rows > 0) {
      console.warn('⚠️ [Tinybird Debug]', result.quarantined_rows, 'rows quarantined for', tableName + '. This usually means schema mismatch.')
    }
    
    return { success: true, message: 'Successfully sent record to ' + tableName }
  } catch (error) {
    console.error('❌ [Tinybird Debug] Exception for', tableName + ':', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * Send multiple records to a specific Tinybird table (one by one)
 */
async function sendToTinybird(
  tableName: string,
  data: Record<string, unknown>[]
): Promise<TinybirdResponse> {
  console.log('🔍 [Tinybird Debug] Sending data to table:', tableName)
  console.log('🔍 [Tinybird Debug] Data count:', data.length)
  
  if (data.length === 0) {
    console.log('🔍 [Tinybird Debug] No data to send to', tableName)
    return { success: true, message: 'No data to send' }
  }

  const results: TinybirdResponse[] = []
  const errors: string[] = []

  // Send each record individually
  for (let i = 0; i < data.length; i++) {
    console.log('🔍 [Tinybird Debug] Sending record', (i + 1) + '/' + data.length, 'to', tableName)
    const result = await sendSingleRecordToTinybird(tableName, data[i])
    results.push(result)
    
    if (!result.success) {
      errors.push('Record ' + (i + 1) + ': ' + result.error)
    }
  }

  const success = errors.length === 0
  const successfulRecords = results.filter(r => r.success).length

  return {
    success,
    message: success 
      ? 'Successfully sent ' + successfulRecords + '/' + data.length + ' records to ' + tableName
      : 'Failed to send ' + errors.length + '/' + data.length + ' records to ' + tableName,
    error: errors.length > 0 ? errors.join('; ') : undefined
  }
}

/**
 * Ingest data to all Tinybird tables
 */
export async function ingestData(
  toolCalls: ToolCallData[],
  promptMetadata: PromptMetadataData[],
  promptExecutions: PromptExecutionData[],
  userId: string
): Promise<IngestionResult> {
  console.log(`🚀 [Ingestion Debug] Starting data ingestion for user: ${userId}`)
  console.log(`🚀 [Ingestion Debug] Input data counts:`)
  console.log(`  - toolCalls: ${toolCalls.length}`)
  console.log(`  - promptMetadata: ${promptMetadata.length}`)
  console.log(`  - promptExecutions: ${promptExecutions.length}`)
  
  const errors: string[] = []
  
  // Inject user_id into all records
  const toolCallsWithUserId = toolCalls.map(record => ({ ...record, user_id: userId }))
  const promptMetadataWithUserId = promptMetadata.map(record => ({ ...record, user_id: userId }))
  const promptExecutionsWithUserId = promptExecutions.map(record => ({ ...record, user_id: userId }))

  console.log(`🚀 [Ingestion Debug] After user_id injection:`)
  console.log(`  - toolCallsWithUserId: ${toolCallsWithUserId.length} records`)
  console.log(`  - promptMetadataWithUserId: ${promptMetadataWithUserId.length} records`)
  console.log(`  - promptExecutionsWithUserId: ${promptExecutionsWithUserId.length} records`)

  // Log sample data to verify correct routing
  if (toolCallsWithUserId.length > 0) {
    console.log("🚀 [Ingestion Debug] Sample tool_calls data:", JSON.stringify(toolCallsWithUserId[0], null, 2))
  }
  if (promptMetadataWithUserId.length > 0) {
    console.log("🚀 [Ingestion Debug] Sample prompt_metadata data:", JSON.stringify(promptMetadataWithUserId[0], null, 2))
  }
  if (promptExecutionsWithUserId.length > 0) {
    console.log("🚀 [Ingestion Debug] Sample prompt_executions data:", JSON.stringify(promptExecutionsWithUserId[0], null, 2))
  }

  // Send to all tables in parallel
  console.log("🚀 [Ingestion Debug] Sending data to Tinybird tables...")
  const [toolCallsResult, promptMetadataResult, promptExecutionsResult] = await Promise.all([
    sendToTinybird('tool_calls', toolCallsWithUserId),
    sendToTinybird('prompt_metadata', promptMetadataWithUserId),
    sendToTinybird('prompt_executions', promptExecutionsWithUserId),
  ])

  // Collect errors
  if (!toolCallsResult.success) {
    errors.push(`Tool calls: ${toolCallsResult.error}`)
  }
  if (!promptMetadataResult.success) {
    errors.push(`Prompt metadata: ${promptMetadataResult.error}`)
  }
  if (!promptExecutionsResult.success) {
    errors.push(`Prompt executions: ${promptExecutionsResult.error}`)
  }

  const success = errors.length === 0

  return {
    success,
    tool_calls: toolCallsResult,
    prompt_metadata: promptMetadataResult,
    prompt_executions: promptExecutionsResult,
    errors: errors.length > 0 ? errors : undefined,
  }
}
