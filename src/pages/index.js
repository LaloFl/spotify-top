import React, { useEffect } from 'react'
import { login, audioFeatures, searchSong } from '../../spotify-fetch'

import SongsSearchbar from '../../components/SongsSearchbar'

const test = () => {
    // searchSong('d.a.n.c.e')
    // .then(res => res.json())
    // .then(data => {
    //     const track = data.tracks.items[0]
    //     console.log(track)
    //     audioFeatures(track.id)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //     })
    // })
}

export default function Home() {
    useEffect(() => {
        document.title = 'Home'
        test()
    }, [])

    return (
        <>
            <SongsSearchbar />
            <button
            onClick={() => {window.location.href = login()}}
            >
                Log in
            </button>

        </>
    )
}
