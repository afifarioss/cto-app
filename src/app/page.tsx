'use client'

import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim()) return
    
    setLoading(true)
    try {
      const res = await fetch('/api/kimi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      const data = await res.json()
      setResponse(data.response || data.error || 'No response')
    } catch (error) {
      setResponse('Error: ' + String(error))
    }
    setLoading(false)
  }

  return (
    <main style={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px',
      background: '#f5f5f5',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px' }}>
          🤖 Kimi AI Agent
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px', fontSize: '14px' }}>
          Powered by Mistral 7B (free tier)
        </p>
        
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask Kimi anything..."
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                padding: '12px 24px',
                background: loading ? '#999' : '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: loading ? 'default' : 'pointer'
              }}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
        
        {response && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            marginTop: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            whiteSpace: 'pre-wrap'
          }}>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Kimi (via Mistral) says:</p>
            <p>{response}</p>
          </div>
        )}
      </div>
    </main>
  )
}
