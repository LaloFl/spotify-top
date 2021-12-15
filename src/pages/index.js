import React, { useEffect } from 'react'
import { login, audioFeatures, searchSong } from '../../spotify-fetch'

import SongsSearchbar from '../../components/SongsSearchbar'
import PieChart from '../../components/PieChart'

const test = () => {

}

export default function Home() {
    useEffect(() => {
        document.title = 'Home'
        test()
    }, [])
    const data = [
        {
            label: 'Energy',
            color: '#F155BB',
            value: 10,
        },
        {
            label: 'Danceability',
            color: '#55F18C',
            value: 20,
        },
        {
            label: 'Valence',
            color: '#F1F155',
            value: 30,
        },
    ]
    return (
        <>
            <SongsSearchbar />
            <button
            onClick={() => {window.location.href = login()}}
            >
                Login
            </button>
            <PieChart size={200} data={data}
            placeholder1="data" placeholder2="data2" />
        </>
    )
}
