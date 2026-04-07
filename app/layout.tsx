import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wall Calendar',
  description: 'An interactive, tactile wall calendar component',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-garden-cream text-garden-text">
        {children}
      </body>
    </html>
  )
}
