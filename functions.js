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
    const keys = ['energy', 'danceability', 'valence', 'acousticness']
    const sum = {}
    keys.forEach(key => sum[key] = details.reduce((acc, curr) => acc + curr[key], 0))
    return sum
}

function getPercentagesData(details) {
    const sum = getFeaturesSum(details)
    const valuesSum = Object.values(sum).reduce((acc, curr) => acc + curr, 0)
    const keys = ['energy', 'danceability', 'valence', 'acousticness']
    const colors = {
        energy: '#F1DA55',
        danceability: '#F15587',
        valence: '#55EFF1',
        acousticness: '#F18C55',
    }
    const descriptions = {
        energy: 'Energetic',
        danceability: 'A dancer',
        valence: 'Happy',
        acousticness: 'Acoustic'
    }
    const percentages = []
    keys.forEach(key => {
        const percentage = sum[key] * 100 / valuesSum 
        // percentage += key==='energy' ? -7 : key==='danceability' ? 0 : key==='valence' ? 1 : key==='acousticness' ? 6 : 0
        percentages.push({
            label: key,
            color: colors[key],
            value: percentage,
            desc: descriptions[key]
        })
    });
    return percentages
}

export {
    tracksDetailArray,
    getFeaturesSum,
    getPercentagesData
}