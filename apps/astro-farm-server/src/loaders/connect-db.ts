import mongoose from 'mongoose'

import { logger } from '@astro/server/logger'

import { env } from '../config'

export const connectDB = async () => {
    await mongoose.connect(env.ASTRO_FARM_MONGO_URI)
    logger.info('MongoDB is connected')
}
