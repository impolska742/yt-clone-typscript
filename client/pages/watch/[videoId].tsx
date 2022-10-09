import { useRouter } from 'next/router'
import React from 'react'

const WatchVideoPage = () => {
    const { query } = useRouter()
    return (
        <video
            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
            width="800px"
            height="auto"
            controls
            autoPlay
            id="video-player"
        />
    )
}

export default WatchVideoPage
