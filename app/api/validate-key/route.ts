import { validateApiKey } from "@/lib/auth";
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const apiKey = request.headers.get('x-api-key')
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key required' },
      { status: 401 }
    )
  }
  
  const result = await validateApiKey(apiKey);
  
  if (!result.valid) {
			return NextResponse.json(
				{ error: result.error?.message || "Invalid API key" },
				{ status: 401 },
			);
		}
  
  return NextResponse.json({
			success: true,
			user: result.userId,
			metadata: result.metadata,
		});
}
