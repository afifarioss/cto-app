import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CTO Test App',
  description: 'Base Wallet Connect Demo',
  verification: {
    other: {
      'virtual-protocol-site-verification': '9d2a8e7fcd51c1dff6d09c0a05121366',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="virtual-protocol-site-verification" content="9d2a8e7fcd51c1dff6d09c0a05121366" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
