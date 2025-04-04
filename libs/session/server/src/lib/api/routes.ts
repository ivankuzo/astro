import * as express from 'express'

import { validateRequest } from '@astro/server/validation'
import { createNonceSchema, verifyNonceSchema } from '@astro/session-api-contracts'

import { createNonce, signOut, verifyNonce } from './controllers'

export const sessionRouter = express.Router()

sessionRouter.post('/createNonce', validateRequest(createNonceSchema), createNonce)
sessionRouter.post('/verifyNonce', validateRequest(verifyNonceSchema), verifyNonce)
sessionRouter.delete('/signOut', signOut)
