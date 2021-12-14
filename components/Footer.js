import React from 'react'
import Link from 'next/link'
import {FaGithub} from 'react-icons/fa'

export default function Footer() {
    return (
        <div className='footer'>
            <span className='icon-link'>
                <a href='https://github.com/LaloFl/' target="_blank">
                <FaGithub/> LaloFl 
                </a>
            </span>
        </div>
    )
}
