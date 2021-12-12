import React, { useEffect } from 'react'

import { searchSong } from '../spotify-fetch'

export default function SongsSuggestions({query}) {

    const [tracks, setTracks] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        setLoading(true)
        if (!query) return
        searchSong(query)
        .then(response => response.json())
        .then(data => {
            setTracks(data.tracks)
            setLoading(false)
        })
    }, [query])

    const loadingJSX = (
        <div className="loading">
            Loading
        </div>
    )

    return(
        !query ? <></> : 
        loading ? loadingJSX :
        tracks.items.length === 0 ? <></> :
        <div className="suggestions-box">
            {tracks.items.map(track => 
            <div key={track.id} className='suggestion'>
                <img src={track.album.images[2].url} alt={track.name}/>
                {track.album.artists[0].name} - {track.name}
            </div>
            )}
        </div>
    )
}
