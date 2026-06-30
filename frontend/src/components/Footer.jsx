import React from 'react'
import { FaYoutube, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'

export default function Footer() {
    return (
        <div className="w-full h-80 bg-navy flex items-center justify-center relative">
            <div className="flex  items-center justify-between absolute bottom-10">
                <div className="text-white text-[170px] font-sansala mb-4">
                    wixl <span className="text-yelo">jeÈisxy</span>
                </div>
                <div className="flex flex-col items-center justify-center ml-10">
                    <div className="text-yelo text-lg mb-4">
                        Bsc(Chem)University Of Kelaniya
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="text-white text-3xl hover:text-yelo transition duration-300" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-white text-3xl hover:text-yelo transition duration-300" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-white text-3xl hover:text-yelo transition duration-300" />
                        </a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="text-white text-3xl hover:text-yelo transition duration-300" />
                        </a>
                    </div>
                    <div className="text-white text-sm">
                        &copy; {new Date().getFullYear()} AWCHEM. All rights reserved.
                    </div>
                    <div className="text-white text-sm">
                        Designed and Developed by <a href="https://www.dinuja.online/" target="_blank" rel="noopener noreferrer" className="text-gra hover:text-yelo hover:underline">Dinuja Ubeysinghe</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
