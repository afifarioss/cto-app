import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    
    // Hugging Face API - using a reliable free model
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: message,
          parameters: {
            max_new_tokens: 100,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      }
    )
    
    const data = await response.json()
    
    // Check for errors
    if (!response.ok) {
      console.error('Hugging Face API Error:', data)
      return NextResponse.json({ 
        error: data.error || 'API Error',
        details: data
      }, { status: response.status })
    }
    
    // Extract the generated text
    let reply = data.generated_text || data[0]?.generated_text || 'No response'
    
    return NextResponse.json({ 
      response: reply.trim()
    })
  } catch (error) {
    console.error('Server Error:', error)
    return NextResponse.json({ 
      error: String(error) 
    }, { status: 500 })
  }
}
