import { ThemeContext } from '@emotion/react'
import { Card, Text } from '@mantine/core'
import Link from 'next/link'
import { Video } from '../types'

const VideoTeaser = ({ video }: { video: Video }) => {
    return (
        <Link href={`/watch/${video.videoId}`} passHref>
            <Card
                shadow="sm"
                p="xl"
                component="a"
                href={`/watch/${video.videoId}`}
                mb={20}
                sx={{
                    backgroundColor: '#bababa',
                    ':hover': {
                        opacity: 0.8,
                    },
                }}
            >
                <Text weight={500} size="lg">
                    {video.title}
                </Text>

                <Text size="sm">{video.description}</Text>
            </Card>
        </Link>
    )
}

export default VideoTeaser
