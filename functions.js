function tracksDetailArray(tracks) {
    return tracks.map(track => {
        return {
            energy: track.energy,
            danceability: track.danceability,
            valence: track.valence,
            acousticness: track.acousticness,
            instrumentalness: track.instrumentalness,
            speechiness: track.speechiness,
            liveness: track.liveness,
            loudness: track.loudness,
            tempo: track.tempo
        }
    })
}

function getFeaturesSum(details) {
    const keys = ['energy', 'danceability', 'valence', 'acousticness', 'instrumentalness', 'speechiness', 'liveness']
    const sum = {}
    keys.forEach(key => sum[key] = details.reduce((acc, curr) => acc + curr[key], 0))
    return sum
}

export {
    tracksDetailArray,
    getFeaturesSum
}