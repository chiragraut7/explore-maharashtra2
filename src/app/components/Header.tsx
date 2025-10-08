'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import Link from "next/link"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  const pathname = usePathname() // current route

  const navItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Beaches", href: "/beaches" },
    { title: "Hill Stations", href: "/hills" },
    { title: "Forts", href: "/forts" },
    { title: "Wildlife & Nature", href: "/nature" },
    { title: "Religious", href: "/religious" },
    { title: "Cultural", href: "/cultural" },
    { title: "Contact", href: "/contact" },
  ]

  return (
    <header className="shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light px-3">
        <a className="navbar-brand d-flex align-items-center text-white" href="#">
          <Image src="/assets/images/logo.png" alt="Explore Maharashtra Logo" height={50} width={190} className="me-2" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li className="nav-item" key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link text-white ${pathname === item.href ? 'active' : ''}`}
                >
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
