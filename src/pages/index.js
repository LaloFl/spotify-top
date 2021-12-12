import React, { useEffect } from 'react'
import { searchSong } from '../../spotify-fetch'

import SongsSearchbar from '../../components/SongsSearchbar'

export default function Home() {
    useEffect(() => {
        document.title = 'Home'
    }, [])

    return (
        <div className='test'>
            <SongsSearchbar />
        </div>
    )
}
