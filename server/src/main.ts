import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import { connectDatabase, disconnectDatabase } from './utils/database'
import logger from './utils/logger'
import { CORS_ORIGIN } from './constants'

import userRoute from './modules/user/user.route'
import authRoute from './modules/auth/auth.route'
import videoRoute from './modules/videos/video.route'
import deserializeUser from './middlewares/deserializeUser'

const PORT = process.env.PORT || 4000

const app = express()

// Middlewares
dotenv.config()
app.use(cookieParser())
app.use(express.json())
app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    }),
)
app.use(helmet())
app.use(deserializeUser)

// Routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/videos', videoRoute)

// Server connection
const server = app.listen(PORT, async () => {
    await connectDatabase()
    logger.info(`Server is running on http://localhost:${PORT}`)
})

// Hit server

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

// Handling Shutdown logs

const signals = ['SIGTERM', 'SIGINT']

const gracefulShutDown = async (signal: string) => {
    process.on(signal, async () => {
        logger.info('Goodbye, got signal :', signal)
        server.close()

        // disconnect from the db
        await disconnectDatabase()

        logger.info('My work here is done.')

        process.exit(0)
    })
}

for (let i = 0; i < signals.length; i++) {
    gracefulShutDown(signals[i])
}
