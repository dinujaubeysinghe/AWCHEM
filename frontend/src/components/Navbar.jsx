import React from 'react'

export default function Navbar() {
  return (
    <div>
      <nav className="bg-navy mx-8 mt-2 rounded-full py-5 px-10 border border-white">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointe">
                <a href="/" className="text-5xl font-sansala text-white">wixl <span className="text-5xl text-yelo font-sansala">jeÈisxy</span></a>
            </div>
            <div className="flex space-x-20 ml-10 text-gra">
                <a href="/">HOME</a>
                <a href="#about" >ABOUT</a>
                <a href="#classes" >CLASSES</a>
                <a href="#process">PROCESS</a>
            </div>
            <div className="flex space-x-2 ml-10">
                <a href="/login" className="border border-yelo text-yelo px-6 py-2 rounded-full ml-10">LOGIN</a>
                <a href="/signup" className="bg-yelo text-navy px-4 py-2 rounded-full ml-4">SIGN UP</a>
            </div>
            
        </div>

      </nav>
    </div>
  )
}
