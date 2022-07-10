import mongoose from 'mongoose'
import logger from './logger'

const DB_CONNECTION_STRING =
    process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/yt-clone'

export async function connectDatabase() {
    try {
        await mongoose.connect(DB_CONNECTION_STRING)
        logger.info('Connected to Database successfully !!')
    } catch (err) {
        logger.error(err, 'Failed to connect to the Database. Goodbye.')
        process.exit(1)
    }
}

export async function disconnectDatabase() {
    await mongoose.connection.close()
    logger.info('Disconnected from the Database.')
    return
}
