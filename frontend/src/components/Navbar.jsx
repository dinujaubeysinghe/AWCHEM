import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <nav className="bg-navy mx-2 sm:mx-4 md:mx-8 mt-2 rounded-full py-4 md:py-5 px-6 md:px-10 border border-white">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <a href="/" className="text-2xl md:text-5xl font-sansala text-white shrink-0">
                        wixl <span className="text-yelo font-sansala">jeÈisxy</span>
                    </a>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex space-x-10 lg:space-x-20 ml-10 text-gra">
                        <a href="/">HOME</a>
                        <a href="#about">ABOUT</a>
                        <a href="#classes">CLASSES</a>
                        <a href="#process">PROCESS</a>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex space-x-2 ml-10">
                        <a href="/login" className="border border-yelo text-yelo px-4 lg:px-6 py-2 rounded-full ml-4 lg:ml-10 text-sm lg:text-base">LOGIN</a>
                        <a href="/signup" className="bg-yelo text-navy px-3 lg:px-4 py-2 rounded-full ml-2 lg:ml-4 text-sm lg:text-base">SIGN UP</a>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-white ml-4"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden mt-4 flex flex-col gap-4 text-gra px-2 pb-2">
                        <a href="/" onClick={() => setMenuOpen(false)}>HOME</a>
                        <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
                        <a href="#classes" onClick={() => setMenuOpen(false)}>CLASSES</a>
                        <a href="#process" onClick={() => setMenuOpen(false)}>PROCESS</a>
                        <div className="flex gap-3 mt-2">
                            <a href="/login" className="border border-yelo text-yelo px-4 py-1.5 rounded-full text-sm">LOGIN</a>
                            <a href="/signup" className="bg-yelo text-navy px-4 py-1.5 rounded-full text-sm">SIGN UP</a>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}