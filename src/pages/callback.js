import React, { useEffect } from 'react'

import {getUser, getUserTop} from '../../spotify-fetch.js'

export default function Callback() {
    useEffect(() => {
        if (!window.location.hash) return
        const params = window.location.hash.substr(1).split('&')
        const [, token] = params[0].split('=')

        getUser(token)
        .then(user => user.json())
        .then(user => {
            console.log(user)
        })

        getUserTop(token, "artists", "long_term")
        .then(response => response.json())
        .then(data => {
            console.log(data)
        }) 
    })
    return (
        <div>
            
        </div>
    )
}
