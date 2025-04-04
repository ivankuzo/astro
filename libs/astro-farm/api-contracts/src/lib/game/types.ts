import { z } from 'zod'

import { Game } from '@astro/astro-farm-game-core'

import {
    buyBoostsSchema,
    buySeedsSchema,
    harvestSchema,
    plantSchema,
    upgradeDomeSchema,
    energyRestoreBoostSchema,
    growthTimeReductionBoostSchema,
} from './schema'

export type GameResponse = Game

export type PlantRequest = z.TypeOf<typeof plantSchema>
//export type PlantResponse = GameResponse

export type HarvestRequest = z.TypeOf<typeof harvestSchema>
//export type HarvestResponse = GameResponse

export type BuySeedsRequest = z.TypeOf<typeof buySeedsSchema>
//export type BuySeedsResponse = GameResponse

export type BuyBoostsRequest = z.TypeOf<typeof buyBoostsSchema>
//export type BuyBoostsResponse = GameResponse

export type UpgradeDomeRequest = z.TypeOf<typeof upgradeDomeSchema>
//export type UpgradeDomeResponse = GameResponse

export type GrowthTimeReductionBoostRequest = z.TypeOf<typeof growthTimeReductionBoostSchema>
//export type GrowthTimeReductionBoostResponse = GameResponse

export type EnergyRestoreBoostRequest = z.TypeOf<typeof energyRestoreBoostSchema>
//export type EnergyRestoreBoostResponse = GameResponse

export type GetGameRequest = void
//export type GetGameResponse = GameResponse
