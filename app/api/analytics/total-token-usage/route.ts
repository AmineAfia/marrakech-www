import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: Request) {
  try {
    // Verify user authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const requestedUserId = searchParams.get('userId')
    const timeframe = searchParams.get('timeframe') || '24h'
    
    // Validate that requested userId matches authenticated user's ID
    if (requestedUserId && requestedUserId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tinybirdToken = process.env.TINYBIRD_TOKEN
    if (!tinybirdToken) {
      return NextResponse.json({ error: 'Tinybird token not configured' }, { status: 500 })
    }

    // Build Tinybird API URL
    const tinybirdUrl = new URL('https://api.us-east.aws.tinybird.co/v0/pipes/total_token_usage.json')
    tinybirdUrl.searchParams.set('userId', session.user.id)
    tinybirdUrl.searchParams.set('timeframe', timeframe)
    tinybirdUrl.searchParams.set('token', tinybirdToken)

    // Fetch data from Tinybird
    const response = await fetch(tinybirdUrl.toString())
    
    if (!response.ok) {
      console.error('Tinybird API error:', response.status, response.statusText)
      return NextResponse.json({ error: 'Failed to fetch data from Tinybird' }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
