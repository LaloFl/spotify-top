import React, {useEffect} from 'react'
import { useRouter } from 'next/router'

export default function Track() {
    const router = useRouter()
    const {id} = router.query
    
    useEffect(() => {
        
    })
    return (
        <div>
            Track id = {id}
        </div>
    )
}
