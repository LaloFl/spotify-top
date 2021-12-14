import React from 'react'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'

export default function Navbar() {
    return (
        <nav className='navbar'>
            <div className='nav_box'>
                    <Link className="link" href='/'>
                        <span className='link'><FaHome/></span>
                    </Link>
            </div>
        </nav>
    )
}
