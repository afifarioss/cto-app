'use client'

import { useState } from 'react'

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null)
  const [balance, setBalance] = useState<string>('0.00')
  const [loading, setLoading] = useState(false)

  const connectWallet = async () => {
    setLoading(true)
    // Simulated wallet connection (CDP integration coming next)
    setTimeout(() => {
      setWallet('0x7845D45d9E53268EBFf3C4a9daBb994cE5b93918')
      setBalance('0.42')
      setLoading(false)
    }, 1000)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>
            ⛓️ CTO Base
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            Base Sepolia • Wallet Dashboard
          </p>
        </div>

        {!wallet ? (
          <button
            onClick={connectWallet}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? '#334155' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'default' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Connecting...' : '🔗 Connect Wallet'}
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Wallet Address
              </p>
              <p style={{ color: 'white', fontFamily: 'monospace', fontSize: '14px', marginTop: '4px' }}>
                {wallet.slice(0, 6)}...{wallet.slice(-4)}
              </p>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Balance (Base Sepolia)
              </p>
              <p style={{ color: '#4ade80', fontSize: '24px', fontWeight: '700', marginTop: '4px' }}>
                {balance} ETH
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                📤 Send
              </button>
              <button style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                📊 History
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#475569', fontSize: '12px' }}>
            Base Sepolia Testnet • Powered by CDP SDK
          </p>
        </div>
      </div>
    </main>
  )
}
