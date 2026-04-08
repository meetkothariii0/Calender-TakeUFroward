import type { Metadata } from 'next'
import './globals.css'
import { Schibsted_Grotesk, Inter, Fustat } from 'next/font/google'

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  weights: ['400', '500', '600', '700'],
  variable: '--font-schibsted-grotesk'
})

const inter = Inter({
  subsets: ['latin'],
  weights: ['400', '500', '600', '700'],
  variable: '--font-inter'
})

const fustat = Fustat({
  subsets: ['latin'],
  weights: ['400', '500', '600', '700'],
  variable: '--font-fustat'
})

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
    <html lang="en" className={`${schibstedGrotesk.variable} ${inter.variable} ${fustat.variable}`}>
      <body className="bg-garden-cream text-garden-text">
        {children}
      </body>
    </html>
  )
}
