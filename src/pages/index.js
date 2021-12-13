import React, { useEffect } from 'react'
import { login } from '../../spotify-fetch'

import SongsSearchbar from '../../components/SongsSearchbar'

export default function Home() {
    useEffect(() => {
        document.title = 'Home'
        
    }, [])

    return (
        <div className='test'>
            <SongsSearchbar />
            <button
            onClick={() => {window.location.href = login()}}
            >
                Log in
            </button>
        </div>
    )
}
