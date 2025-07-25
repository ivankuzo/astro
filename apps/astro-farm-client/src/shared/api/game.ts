import { api } from '@astro/client-api'
import {
    GameResponse,
    PlantRequest,
    HarvestRequest,
    BuySeedsRequest,
    BuyBoostsRequest,
    UpgradeDomeRequest,
    GrowthTimeBoostRequest,
    EnergyBoostRequest,
    LeaderboardEntry,
} from '@astro/astro-farm-api-contracts'

export const getGame = async (): Promise<GameResponse> => {
    const { data } = await api.get<GameResponse>('/game')
    return data
}

export const plant = async (request: PlantRequest): Promise<GameResponse> => {
    const { data } = await api.post<GameResponse>('/game/plant', request.body)
    return data
}

export const harvest = async (request: HarvestRequest): Promise<GameResponse> => {
    const { data } = await api.post<GameResponse>('/game/harvest', request.body)
    return data
}

export const buySeeds = async (request: BuySeedsRequest): Promise<GameResponse> => {
    const { data } = await api.post<GameResponse>('/game/buy-seeds', request.body)
    return data
}

export const buyBoosts = async (request: BuyBoostsRequest): Promise<GameResponse> => {
    const { data } = await api.post<GameResponse>('/game/buy-boosts', request.body)
    return data
}

export const upgradeDome = async (request: UpgradeDomeRequest): Promise<GameResponse> => {
    const { data } = await api.post<GameResponse>('/game/upgrade-dome', request.body)
    return data
}

export const growthTimeBoost = async (request: GrowthTimeBoostRequest): Promise<GameResponse> => {
    const { data } = await api.post<GameResponse>(
        '/game/use-growth-time-reduction-boost',
        request.body
    )
    return data
}

export const energyBoost = async (request: EnergyBoostRequest): Promise<GameResponse> => {
    const { data } = await api.post<GameResponse>('/game/use-energy-restore-boost', request.body)
    return data
}

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    const { data } = await api.get<LeaderboardEntry[]>('/game/leaderboard')
    return data
}
