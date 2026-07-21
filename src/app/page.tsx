export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>CTO Test App</h1>
      <p style={{ marginTop: '16px', fontSize: '1.25rem' }}>✅ Base + AI Ready</p>
      <p style={{ marginTop: '8px', color: '#666' }}>GitHub • Vercel • AI Team</p>
    </main>
  )
}
