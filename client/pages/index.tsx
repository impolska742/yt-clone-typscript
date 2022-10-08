import { ReactElement } from 'react'
import HomePageLayout from '../layout/Home'
import styles from '../styles/Home.module.css'

const Home = () => {
    return <div className={styles.container}></div>
}

Home.getLayout = (page: ReactElement) => <HomePageLayout>{page}</HomePageLayout>

export default Home
