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
      const res = await fetch('/api/agent', {
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
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>
          🤖 Virtuals Agent
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>
          Powered by Kimi K3 on Virtuals
        </p>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
            style={{
              flex: 1,
              padding: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: 'white',
              fontSize: '16px',
              outline: 'none'
            }}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              padding: '12px 20px',
              background: loading ? '#334155' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'default' : 'pointer'
            }}
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
        
        {response && (
          <div style={{
            marginTop: '16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '10px',
            padding: '16px',
            border: '1px solid rgba(255,255,255,0.05)',
            whiteSpace: 'pre-wrap',
            color: '#e2e8f0'
          }}>
            {response}
          </div>
        )}
      </div>
    </main>
  )
}
