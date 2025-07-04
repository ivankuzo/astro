import { z } from 'zod'

import { Game } from '@astro/astro-farm-game-core'

import {
    buyBoostsSchema,
    buySeedsSchema,
    harvestSchema,
    plantSchema,
    upgradeDomeSchema,
    energyBoostSchema,
    growthTimeBoostSchema,
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

export type GrowthTimeBoostRequest = z.TypeOf<typeof growthTimeBoostSchema>
//export type GrowthTimeBoostResponse = GameResponse

export type EnergyBoostRequest = z.TypeOf<typeof energyBoostSchema>
//export type EnergyBoostResponse = GameResponse

export type GetGameRequest = void
//export type GetGameResponse = GameResponse

export type LeaderboardEntry = {
    walletAddress: string
    xp: number
}
