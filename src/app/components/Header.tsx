// app/components/Header.js
'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import Link from "next/link";
import Image from 'next/image';

export default function Header() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <header className="shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light px-3">
        <a className="navbar-brand d-flex align-items-center text-white" href="#">
          <Image src="/assets/images/logo.png" alt="Explore Maharashtra Logo" height="50" className="me-2" width="190" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link text-white active" href="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" href="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" href="/beaches">Beaches</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" href="/hills">Hill Stations</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" href="/forts">Forts</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" href="/nature">Wildlife & Nature</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" href="/religious">Religious</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" href="/cultural">Cultural</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" href="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
