import { z } from 'zod'
import { logger } from '@astro/server/logger'

const envSchema = z.object({
    SESSION_SECRET_JWT: z.string().nonempty(),
    ASTRO_FARM_MONGO_URI: z.string().nonempty(),
    ASTRO_FARM_PORT: z
        .string()
        .nonempty()
        .transform(val => Number(val)),
    NODE_ENV: z.enum(['development', 'production']),
})

const validateEnv = () => {
    try {
        return envSchema.parse(process.env)
    } catch (error) {
        logger.error('Environment variables validation error:')
        logger.error(error.format())
        process.exit(1)
    }
}

export const env = validateEnv()
