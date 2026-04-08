import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Schibsted_Grotesk, Inter } from 'next/font/google'

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-schibsted-grotesk'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

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
    <html lang="en" className={`${schibstedGrotesk.variable} ${inter.variable}`}>
      <body className="bg-garden-cream text-garden-text">
        {children}
      </body>
    </html>
  )
}
