import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express } from 'express'
import 'express-async-errors'
import { errorHandler } from '@astro/server/errors'
import { isAuthorized } from '@astro/session-server'
import { appRouter } from '../../api/app-router'
import path from 'path'
import { env } from '../../config'

export default ({ app }: { app: Express }) => {
    app.set('trust proxy', true)

    app.use(cors())
    app.use(cookieParser())
    app.use(express.json({ type: 'application/json' }))

    app.use('/api', isAuthorized, appRouter)

    if (env.NODE_ENV === 'production') {
        app.use(express.static(path.join(process.cwd(), 'public')))

        app.get('*', (req, res) => {
            if (!req.path.startsWith('/api/')) {
                res.sendFile(path.join(process.cwd(), 'public/index.html'))
            }
        })
    }

    app.use(errorHandler)
}
