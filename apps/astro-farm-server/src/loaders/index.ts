import { Express } from 'express'

import { connectDB } from './connect-db'
import expressLoader from './express'
import { initRedis } from '@astro/server/redis'

export default async ({ app }: { app: Express }) => {
    await connectDB()
    await initRedis()
    expressLoader({ app })
}
