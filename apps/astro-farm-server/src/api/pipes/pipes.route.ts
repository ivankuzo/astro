import * as express from 'express'

import { submitPipesGameResultSchema } from '@astro/astro-farm-api-contracts'
import { validateRequest } from '@astro/server/validation'
import { requireAuth } from '@astro/session-server'

import { getPipesGame, submitPipesGameResult } from './pipes.controller'

const router = express.Router()

router.use(requireAuth)

router.get('/', getPipesGame)

router.post('/submit-result', validateRequest(submitPipesGameResultSchema), submitPipesGameResult)

export const pipesRouter = router
