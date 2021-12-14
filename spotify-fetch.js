import {CLIENT_ID, CLIENT_SECRET} from './credentials.js'

const getToken = async () => {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    })
    return await tokenResponse.json()
}

const searchSong = async (song, limit=20) => {
    const token = await getToken()
    const response = await fetch(`https://api.spotify.com/v1/search?q=${song}&type=track&limit=${limit}`, {
        headers: {
            'Authorization': 'Bearer ' + token.access_token
        }
    })
    return response;
}

const getUser = async (token) => {
    const response = await fetch(`https://api.spotify.com/v1/me`, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    return response;
}

const getUserTop = async (token, type, time_range="medium_term") => {
    const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    return response;
}

const audioFeatures = async (id, many=false) => {
    const token = await getToken()
    var response;
    if (many) {
        response = await fetch(`https://api.spotify.com/v1/audio-features?ids=${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token.access_token
            }
        })
        response;
    } else {
        response = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token.access_token
            }
        })
    }
    return response;
}

const getTracksDetails = async (tracks) => {
    const tracksIDs = tracks.map(track => track.id)
    const IDsString = tracksIDs.join(',')
    const features = await audioFeatures(IDsString, true)
    const featuresData = await features.json()
    const fullTracks = tracks.map((track, index) => {
        return {
            ...track,
            ...featuresData.audio_features[index]
        }
    })
    return fullTracks;
}

const login = () => {
    const REDIRECT_URI = 'https://spotify-top-vercel.vercel.app/callback'
    const SCOPES = [
        'user-read-private',
        'user-read-email',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'user-read-recently-played',
        'user-top-read'
    ]
    const SCOPES_STRING = SCOPES.join('%20')
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_STRING}&show_dialog=true`
    return url;
}




export { 
    searchSong,
    getUser,
    login,
    getUserTop,
    audioFeatures,
    getTracksDetails
};
