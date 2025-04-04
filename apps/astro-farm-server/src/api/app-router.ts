import express from 'express'
import { gameRouter } from './game/game.route'
import { sessionRouter } from '@astro/session-server'

export const appRouter = express.Router()

appRouter.use('/game', gameRouter)
appRouter.use('/session', sessionRouter)
