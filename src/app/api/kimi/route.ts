import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    
    // Simple response generator (no API needed)
    const responses = [
      "That's a great question! Let me think about it...",
      "Interesting point! Based on my analysis, I'd say...",
      "I understand what you're asking. Here's my take...",
      "Good question! The answer is...",
      "Let me break that down for you..."
    ]
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return NextResponse.json({ 
      response: `${randomResponse}\n\nYou asked: "${message}"\n\n(I'm currently in testing mode. Connect to a real AI provider to get intelligent responses!)` 
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
