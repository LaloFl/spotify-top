import React, { useEffect } from 'react'

import {getUserTop, getTracksDetails} from '../../spotify-fetch.js'
import {tracksDetailArray, getFeaturesSum} from '../../functions.js'

const topTracksData = async (token) => {
    const userTop = await getUserTop(token, "tracks")
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
            setTracks(response)
            setDetails(getFeaturesSum(tracksDetailArray(response)))
            setLoading(false);
        })
    }, [])
    return loading ? <>Loading</> : 
    (
        <div className='container'>
            <div className='top-stats'>
                <h1 style={{ textAlign: 'center', marginTop:'40px', borderTop:'1px solid #55F18C', paddingTop: '10px', marginTop: '0'}}>Stats</h1>
                {Object.keys(details).map(detail =>
                    <div key={detail} className='stat'>
                        <span style={{color:'white'}}>{detail[0].toUpperCase()+detail.substring(1)}: </span>{Math.round(details[detail]*100/tracks.length)}%
                    </div>
                )}
            </div>
            <div style={{width: 'fit-content'}}>
                <h1 className='txt-3' style={{ textAlign: 'center', margin: '40px auto 20px auto', borderTop:'1px solid #F155BB', paddingTop: '10px', width: 'fit-content'}}>Your Top Tracks</h1>
                {tracks.map(track =>
                    <div className='txt-2 top-box' key={track.id}>
                        <div>
                            <img className="top-img" src={track.album.images[1].url} alt={track.name} height={190} />
                        </div>
                        <div className='top-dedtails txt-3'>
                            {track.name}
                            {keys.map(key =>
                                <span key={key} style={{color:'white'}}>
                                    <br />{key[0].toUpperCase()+key.substring(1)}: <span className='txt-1'>{track[key]}</span>
                                </span>
                            )}<br/><br/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
