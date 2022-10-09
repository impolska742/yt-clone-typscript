import { ReactElement } from 'react'
import { useVideo } from '../context/videos'
import HomePageLayout from '../layout/Home'
import styles from '../styles/Home.module.css'

const Home = () => {
    const { videos } = useVideo()
    return <div className={styles.container}>{JSON.stringify(videos)}</div>
}

Home.getLayout = (page: ReactElement) => <HomePageLayout>{page}</HomePageLayout>

export default Home
