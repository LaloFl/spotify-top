import React, { useEffect } from 'react'

import {getUserTop, getTracksDetails} from '../../spotify-fetch.js'
import {tracksDetailArray, getFeaturesSum} from '../../functions.js'

const topTracksData = async (token) => {
    const userTop = await getUserTop(token, "tracks", "long_term")
    const userTopData = await userTop.json()
    const userTopDetails = await getTracksDetails(userTopData.items)
    return userTopDetails
}

const keys = ['energy', 'danceability', 'valence', 'acousticness', 'instrumentalness', 'speechiness', 'liveness', 'loudness', 'tempo']


export default function Callback() {
    const [tracks, setTracks] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [details, setDetails] = React.useState(null)
    
    useEffect(() => {
        if (!window.location.hash) return;
        setLoading(true);
        const params = window.location.hash.substr(1).split('&');
        const [, token] = params[0].split('=');
        
        topTracksData(token)
        .then(response => {
            console.log(response)
            console.log(getFeaturesSum(tracksDetailArray(response)))
            setTracks(response)
            setDetails(getFeaturesSum(tracksDetailArray(response)))
            setLoading(false);
        })
    }, [])
    return loading ? <>Loading</> : 
    (
        <div>
            {tracks.map(track =>
                <div key={track.id}>
                    {track.name}
                    {keys.map(key =>
                        <span key={key} className='txt-2'>
                            <br />{key[0].toUpperCase()+key.substring(1)}: {track[key]}
                        </span>
                    )}<br/><br/>
                </div>
            )}
        </div>
    )
}
