import React from 'react'
import { GithubIcon } from "@animateicons/react/lucide";

const Navbar = () => {
    return (
        <nav className="bg-purple-700 text-white">
            <div className="flex justify-around items-center p-2">
                <div className="logo font-bold text-2xl">
                    <span className="text-green-400">&lt;</span>
                    LocK
                    <span className="text-green-400">r/&gt;</span>
                </div>

                {/* <ul className="flex gap-4">
                    <li><a className='hover:font-bold' href="/">Home</a></li>
                    <li><a className='hover:font-bold' href="/about">About</a></li>
                    <li><a className='hover:font-bold' href="/contact">Contact</a></li>
                </ul> */}

                <a href="https://github.com/PankajPraja1" target="_blank" rel="noopener noreferrer" className="bg-green-800 rounded-full flex gap-4 items-center justify-center p-3 cursor-pointer hover:bg-green-500 w-fit ring-white ring-1">
                    <GithubIcon
                        size={24}
                        duration={1}
                        color="#ffffff"
                    />
                    <span className='font-bold'>GitHub</span>
                </a>
            </div>
        </nav>
    )
}

export default Navbar
