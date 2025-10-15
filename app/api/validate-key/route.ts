import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const apiKey = request.headers.get('x-api-key')
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key required' },
      { status: 401 }
    )
  }
  
  try {
    // Use the correct Better Auth API method
    const data = await auth.api.verifyApiKey({
      body: {
        key: apiKey
      }
    })
    
    if (!data) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    console.log("data", JSON.stringify(data, null, 2));
    
    return NextResponse.json({
					success: true,
					user: data.key.userId,
					metadata: data.key?.metadata || {},
				});
  } catch (error) {
    console.error('API key validation error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
