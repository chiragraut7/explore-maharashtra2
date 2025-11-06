import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import 'leaflet/dist/leaflet.css'
import { Quicksand } from 'next/font/google'
import './globals.css'

import Header from './components/Header'
import Footer from './components/Footer'
import { ReactNode } from 'react'
import { LanguageProvider } from './components/context/LanguageContext'

// ✅ Google Font
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
})

// ✅ Metadata (allowed only in server components)
export const metadata = {
  title: 'Explore Maharashtra',
  description: 'Discover Beaches, Hill Stations, Forts, Nature, and Culture of Maharashtra.',
  icons: {
    icon: '/favicon.ico',
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <LanguageProvider>
        <Header />
        {children}
        <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
