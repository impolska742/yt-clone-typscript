import { SimpleGrid } from '@mantine/core'
import { ReactElement } from 'react'
import VideoTeaser from '../components/VideoTeaser'
import { useVideo } from '../context/videos'
import HomePageLayout from '../layout/Home'
import styles from '../styles/Home.module.css'
import { Video } from '../types'

const Home = () => {
    const { videos } = useVideo()
    return (
        <div className={styles.container}>
            <SimpleGrid cols={3}>
                {(videos || []).map((video: Video) => (
                    <VideoTeaser key={video.videoId} video={video} />
                ))}
            </SimpleGrid>
        </div>
    )
}

Home.getLayout = (page: ReactElement) => <HomePageLayout>{page}</HomePageLayout>

export default Home
