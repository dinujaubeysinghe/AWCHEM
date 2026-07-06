import React from 'react'
import { FaYoutube, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'

export default function Footer() {
    return (
        <div className="w-full bg-navy flex items-center justify-center py-10 md:py-16">
            <div className="w-full max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Brand / Logo */}
                <div className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[170px] font-sansala leading-none text-center md:text-left">
                    wixl <span className="text-yelo">jeÈisxy</span>
                </div>

                {/* Info + Socials */}
                <div className="flex flex-col items-center justify-center md:ml-10 text-center">
                    <div className="text-yelo text-base sm:text-lg mb-4">
                        Bsc(Chem) University Of Kelaniya
                    </div>

                    <div className="flex space-x-4 mb-4">
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="text-white text-2xl sm:text-3xl hover:text-yelo transition duration-300" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-white text-2xl sm:text-3xl hover:text-yelo transition duration-300" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-white text-2xl sm:text-3xl hover:text-yelo transition duration-300" />
                        </a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="text-white text-2xl sm:text-3xl hover:text-yelo transition duration-300" />
                        </a>
                    </div>

                    <div className="text-white text-xs sm:text-sm">
                        &copy; {new Date().getFullYear()} AWCHEM. All rights reserved.
                    </div>
                    <div className="text-white text-xs sm:text-sm">
                        Designed and Developed by{' '}
                        <a
                            href="https://www.dinuja.online/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gra hover:text-yelo hover:underline"
                        >
                            Dinuja Ubeysinghe
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}