import Link from 'next/link'
import React, { useEffect } from 'react'
import Loader from 'react-loader-spinner'

import { searchSong, audioFeatures, getTracksDetails } from '../spotify-fetch'
import { tracksDetailArray } from '../functions'

export default function SongsSuggestions({query}) {

    const [tracks, setTracks] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const keys = ['energy', 'danceability', 'valence', 'acousticness', 'instrumentalness', 'speechiness', 'liveness', 'loudness', 'tempo']

    const getTracksData = async () => {
        const tracksRes = await searchSong(query)
        const tracksData = await tracksRes.json();
        if (!tracksData.tracks) return
        const retrievedTracks = tracksData.tracks.items
        return getTracksDetails(retrievedTracks);
    }

    useEffect(() => {
        setLoading(true)
        if (!query) return
        getTracksData()
        .then(response => {
            console.log(response)
            setTracks(response)
            setLoading(false)
        })
    }, [query])

    const loadingJSX = (
        <div className="loading">
            <Loader type="Watch" color="#55F18C" height={20} width={20} />
        </div>
    )

    return(
        !query ? <></> : 
        loading ? loadingJSX :
        !tracks ? <></> :
        <div className="suggestions-box">
            {tracks.map(track => 
            <div key={track.id} className='suggestion'>
                <img 
                height={40} 
                src={track.album.images[2].url} 
                alt={track.name}
                />
                <div>
                    <Link href={`track/${track.id}`}>
                        <span>
                            {track.name.length < 55 ? track.name : track.name.substring(0, 55) + "..."}
                        </span>
                    </Link>
                    <span>{track.artists[0].name}</span>
                    {/* {keys.map(key =>
                        <span key={key} className='txt-2'>
                            {key[0].toUpperCase()+key.substring(1)}: {track[key]}
                        </span>
                    )} */}
                </div>
            </div>
            )}
        </div>
    )
}
