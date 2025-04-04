import * as express from 'express'

import {
    buyBoostsSchema,
    buySeedsSchema,
    harvestSchema,
    plantSchema,
    upgradeDomeSchema,
    energyRestoreBoostSchema,
    growthTimeReductionBoostSchema,
} from '@astro/astro-farm-api-contracts'
import { validateRequest } from '@astro/server/validation'
import { requireAuth } from '@astro/session-server'

import {
    buyBoosts,
    buySeeds,
    getGame,
    harvest,
    plant,
    upgradeDome,
    useEnergyRestoreBoost,
    useGrowthTimeReductionBoost,
} from './game.controller'

const router = express.Router()

router.use(requireAuth)

router.get('/', getGame)

router.post('/plant', validateRequest(plantSchema), plant)
router.post('/harvest', validateRequest(harvestSchema), harvest)

router.post('/buy-seeds', validateRequest(buySeedsSchema), buySeeds)
router.post('/buy-boosts', validateRequest(buyBoostsSchema), buyBoosts)

router.post('/upgrade-dome', validateRequest(upgradeDomeSchema), upgradeDome)

router.post(
    '/use-growth-time-reduction-boost',
    validateRequest(growthTimeReductionBoostSchema),
    useGrowthTimeReductionBoost
)
router.post(
    '/use-energy-restore-boost',
    validateRequest(energyRestoreBoostSchema),
    useEnergyRestoreBoost
)

export const gameRouter = router
