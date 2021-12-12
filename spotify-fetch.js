import {CLIENT_ID, CLIENT_SECRET} from './credentials.js'

const searchSong = async (song) => {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    })
    const token = await tokenResponse.json()

    const response = await fetch(`https://api.spotify.com/v1/search?q=${song}&type=track`, {
        headers: {
            'Authorization': 'Bearer ' + token.access_token
        }
    })

    return response;
}

export { 
    searchSong,
};
