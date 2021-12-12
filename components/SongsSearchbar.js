import React, { useEffect } from 'react'

import SongsSuggestions from './SongsSuggestions'

export default function SongsSearchbar() {
    const [query, setQuery] = React.useState('')
    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    return (
        <div className='searchbar'>
            <input 
            type="text" 
            placeholder="Search for a song..."
            onChange={handleChange}
            />
            <SongsSuggestions query={query}/>
        </div>
    )
}
