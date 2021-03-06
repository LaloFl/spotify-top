import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import Loader from 'react-loader-spinner'
import PieChart from '../../components/PieChart.js'

import {getUserTop, getTracksDetails, getUser} from '../../spotify-fetch.js'
import {tracksDetailArray, getFeaturesSum, getPercentagesData} from '../../functions.js'

const topTracksData = async (token, period) => {
    const userTop = await getUserTop(token, "tracks", period)
    const userTopData = await userTop.json()
    const userTopDetails = await getTracksDetails(userTopData.items)
    return userTopDetails
}

const getUserData = async (token) => {
    const user = await getUser(token)
    const userData = await user.json()
    return userData
}

const keys = ['energy', 'danceability', 'valence', 'acousticness', 'instrumentalness', 'speechiness', 'liveness', 'loudness', 'tempo']


export default function Callback() {
    const [tracks, setTracks] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [details, setDetails] = React.useState(null)
    const [percentages, setPercentages] = React.useState(null)
    const [max, setMax] = React.useState(null)

    const router = useRouter()
    const term = router.query.term
    
    useEffect(async () => {
        if (!window.location.hash) return;
        setLoading(true);
        const params = window.location.hash.substr(1).split('&');
        const [, token] = params[0].split('=');

        const userData = await getUserData(token)
        document.title = userData.display_name.split(' ')[0] + "'s Top Tracks"

        topTracksData(token, term)
        .then(response => {
            const perc = getPercentagesData(tracksDetailArray(response))
            const maxObj = perc[perc.findIndex(item => item.value === Math.max(...perc.map(item => item.value)))]
            const det = getFeaturesSum(tracksDetailArray(response))
            // Set the state
            setTracks(response)
            setMax(maxObj)
            setPercentages(perc)
            setDetails(det)
            // End loading
            setLoading(false);
        })
    }, [term])
    return loading ? 
    <>
        <Loader type="Audio" color="#55F18C" height={50} width={100} />
    </> : 
    (
        <div className='container'>
            <div className='buttons-box'>
                <button
                onClick={() => {
                    const origin = window.location.origin + window.location.pathname
                    const accessToken = window.location.hash.substr(1).split('&')[0].split('=')[1]
                    window.location.href = `${window.location.origin}/callback?term=${'long_term'}#access_token=${accessToken}`
                }}
                >Overall</button>
                <button
                onClick={() => {
                    const origin = window.location.origin + window.location.pathname
                    const accessToken = window.location.hash.substr(1).split('&')[0].split('=')[1]
                    window.location.href = `${window.location.origin}/callback?term=${'medium_term'}#access_token=${accessToken}`
                }}
                >6 Months</button>
                <button
                onClick={() => {
                    const origin = window.location.origin + window.location.pathname
                    const accessToken = window.location.hash.substr(1).split('&')[0].split('=')[1]
                    window.location.href = `${window.location.origin}/callback?term=${'short_term'}#access_token=${accessToken}`
                }}
                >1 Month</button>
            </div>
            <div className='top-stats'>
                <h1 style={{ textAlign: 'center', marginTop:'40px', borderTop:'1px solid #55F18C', paddingTop: '10px', marginTop: '0'}}>Stats</h1>
                {Object.keys(details).map(detail =>
                    <div key={detail} className='stat'>
                        <span style={{color:'white'}}>{detail[0].toUpperCase()+detail.substring(1)}: </span>{Math.round(details[detail]*100/tracks.length)}%
                    </div>
                )}
            </div>
            <div style={{width: 'fit-content'}}>
                <h1 style={{ color:max.color, textAlign: 'center', margin: '40px auto 20px auto', borderTop:`1px solid ${max.color}` , paddingTop: '10px', width: 'fit-content'}}>You are</h1>
                <PieChart size={200} data={percentages} 
                placeholder1={`${max.desc[0].toUpperCase()+max.desc.substring(1)}`} 
                placeholder2={'^^^'} 
                placeholderColor={max.color}
                />
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
