import { NextResponse } from 'next/server'
import { IngestionRequestSchema } from '@/lib/ingestion-schemas'
import { ingestData } from '@/lib/tinybird'
import { validateApiKey } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    // Extract API key from headers
    const apiKey = request.headers.get('x-api-key')
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key required' },
        { status: 401 }
      )
    }

    // Validate API key using shared utility
    const validation = await validateApiKey(apiKey)

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error?.message || 'Invalid API key' },
        { status: 401 }
      )
    }

    const userId = validation.userId

    // Parse and validate request body
    const body = await request.json()
    console.log('📥 [Endpoint Debug] Received request body:', JSON.stringify(body, null, 2))
    
    const validatedData = IngestionRequestSchema.parse(body)
    console.log('📥 [Endpoint Debug] Validated data:', JSON.stringify(validatedData, null, 2))

    // Ingest data to Tinybird
    const result = await ingestData(
      validatedData.tool_calls,
      validatedData.prompt_metadata,
      validatedData.prompt_executions,
      userId
    )

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Data ingestion failed',
          details: result.errors,
          results: {
            tool_calls: result.tool_calls,
            prompt_metadata: result.prompt_metadata,
            prompt_executions: result.prompt_executions,
          }
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Data successfully ingested',
      results: {
        tool_calls: result.tool_calls,
        prompt_metadata: result.prompt_metadata,
        prompt_executions: result.prompt_executions,
      }
    })

  } catch (error) {
    console.error('Ingestion endpoint error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.message 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
