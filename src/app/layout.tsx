// app/layout.tsx
'use client'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import 'leaflet/dist/leaflet.css'
import { Quicksand } from 'next/font/google'
import './globals.css'

import Header from './components/Header'
import Footer from './components/Footer'
import { ReactNode } from 'react'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
})

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
