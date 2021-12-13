import React, { useEffect } from 'react'

import SongsSuggestions from './SongsSuggestions'

export default function SongsSearchbar() {
    const [query, setQuery] = React.useState('')
    return (
        <div className='searchbar'>
            <input 
            type="text" 
            placeholder="Search for a song..."
            onChange={(e) => setQuery(e.target.value)}
            />
            <SongsSuggestions query={query}/>
        </div>
    )
}
