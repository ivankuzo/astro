import 'dotenv/config'
import express from 'express'
import loaders from './loaders'
import { logger } from '@astro/server/logger'
import { env } from './config'

const startServer = async () => {
    try {
        const app = express()
        await loaders({ app })
        app.listen(env.ASTRO_FARM_PORT, () =>
            logger.info(`server running on port ${env.ASTRO_FARM_PORT}`)
        )
    } catch (error) {
        logger.error(error)
        process.exit(1)
    }
}

startServer()
