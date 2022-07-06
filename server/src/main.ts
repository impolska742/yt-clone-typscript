import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import { connectDatabase, disconnectDatabase } from './utils/database'
import logger from './utils/logger'
import { CORS_ORIGIN } from './constants'

import userRoute from './modules/user/user.route'

const PORT = process.env.PORT || 4000

const app = express()

// Middlewares
app.use(cookieParser())
app.use(express.json())
app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    }),
)
app.use(helmet())

// Routes
app.use('/api/users', userRoute)

// Server connection
const server = app.listen(PORT, async () => {
    await connectDatabase()
    logger.info(`Server is running on http://localhost:${PORT}`)
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
