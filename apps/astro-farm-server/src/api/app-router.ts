import express from 'express'
import { gameRouter } from './game/game.route'
import { sessionRouter } from '@astro/session-server'
import { pipesRouter } from './pipes/pipes.route'

export const appRouter = express.Router()

appRouter.use('/game', gameRouter)
appRouter.use('/session', sessionRouter)
appRouter.use('/pipes', pipesRouter)
