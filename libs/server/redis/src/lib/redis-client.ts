import { RedisClientType, createClient } from 'redis'

import { logger } from '@astro/server/logger'

let client: RedisClientType | null = null

export const getRedis = async () => {
    if (!client) {
        client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            socket: {
                reconnectStrategy: retries => {
                    if (retries > 5) {
                        logger.error('Failed to connect to Redis after 5 attempts')
                        process.exit(1)
                    }

                    return 2000
                },
            },
        })

        client.on('error', error => {
            logger.error(error)
        })

        await client.connect()
    }

    return client
}

export const closeRedis = async () => {
    if (client) {
        await client.quit()
        client = null
    }
}

export const initRedis = async () => {
    await getRedis()
    logger.info('Redis is connected')
}
