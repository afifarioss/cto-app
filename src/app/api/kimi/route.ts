import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://cto-app-tau.vercel.app',
          'X-Title': 'CTO Test App',
        },
        body: JSON.stringify({
          model: 'moonshotai/kimi-k2:free',
          messages: [{ role: 'user', content: message }],
          max_tokens: 512,
        }),
      }
    )
    
    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json({ 
        error: `API Error: ${data.error?.message || response.statusText}`,
      }, { status: response.status })
    }
    
    return NextResponse.json({ 
      response: data.choices?.[0]?.message?.content || 'No response from Kimi' 
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
