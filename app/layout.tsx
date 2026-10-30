import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Caveat, Manrope } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/cart-context'

const display = Archivo({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['700', '800'] })
const body = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap', weight: ['400', '500', '700', '800'] })
const note = Caveat({ subsets: ['latin'], variable: '--font-note', display: 'swap', weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Originals By Shivaam | Sneakers in Jaipur',
  description: 'Sneakers, lifestyle and wholesale pairs from Originals By Shivaam in Malviya Nagar, Jaipur.',
  icons: {
    icon: [
      { url: '/images/logo-originals.png', sizes: 'any' },
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo-originals.png' },
    ],
    shortcut: '/images/logo-originals.png',
  },
  openGraph: {
    title: 'Originals By Shivaam',
    description: 'Originals Never Fade. Sneakers and lifestyle in Jaipur.',
    type: 'website',
  },
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#FAF8F4', userScalable: false }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${display.variable} ${body.variable} ${note.variable} antialiased`}><CartProvider>{children}</CartProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
