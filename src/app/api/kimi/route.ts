import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    
    // Try the correct Kimi model name
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/moonshotai/kimi-k2`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
          max_tokens: 512,
        }),
      }
    )
    
    const data = await response.json()
    
    // Better error handling
    if (!response.ok) {
      return NextResponse.json({ 
        error: `API Error: ${data.errors?.[0]?.message || response.statusText}`,
        details: data 
      }, { status: response.status })
    }
    
    return NextResponse.json({ 
      response: data.result?.response || 'No response from Kimi' 
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
