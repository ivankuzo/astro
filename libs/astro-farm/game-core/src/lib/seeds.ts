import { getLevelByXp } from './xp'
import { Dome, DomeUpgradeType } from './dome'
import { IGC_GAIN_LEVELS } from './igc'
import { XP_GAIN_LEVELS } from './xp'
import { Game } from './game'

export type SeedType = 'carbon' | 'hydrogen' | 'solar'

export type SeedId = `${SeedType}_${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`

export type SeedInventory = Record<SeedId, number>

export interface GrowthSpeedLevelDetails {
    bonus: number
    cost: number
}

export interface Seed {
    type: SeedType
    name: string
    level: number
    growthTime: number
    xpGain: number
    igcYield: number
    plantEnergy: number
    harvestEnergy: number
    recoveryRate: number
    price: number
    levelRequired: number
}

export const getSeed = (seedId: SeedId): Seed => {
    const seed = SEEDS.find(seed => `${seed.type}_${seed.level}` === seedId)
    if (!seed) {
        throw new Error(`Seed with id ${seedId} not found`)
    }
    return seed
}

export const getUpgradedSeed = (seedId: SeedId, game: Game): Seed => {
    const baseSeed = getSeed(seedId)

    const growthSpeedBonus = GROWTH_SPEED_LEVELS[game.dome[DomeUpgradeType.growthSpeed]].bonus
    const igcYieldBonus = IGC_GAIN_LEVELS[game.dome[DomeUpgradeType.igcYield]].bonus
    const xpGainBoost = XP_GAIN_LEVELS[game.dome[DomeUpgradeType.xpGain]].boost

    return {
        ...baseSeed,
        growthTime: Math.max(1, Math.floor(baseSeed.growthTime * growthSpeedBonus)),
        igcYield: Math.ceil(baseSeed.igcYield * igcYieldBonus),
        xpGain: Math.ceil(baseSeed.xpGain * xpGainBoost),
    }
}

export const shouldRecoverSeed = (seedId: SeedId) => {
    const seed = getSeed(seedId)
    return Math.random() < seed.recoveryRate
}

export const isSeedUnlocked = (seedId: SeedId, xp: number): boolean => {
    const seed = getSeed(seedId)
    const level = getLevelByXp(xp)
    return level >= seed.levelRequired
}

export const getSeedIdBySeed = (seed: Seed): SeedId => {
    return `${seed.type}_${seed.level}` as SeedId
}

export const GROWTH_SPEED_LEVELS: Record<number, GrowthSpeedLevelDetails> = {
    1: { bonus: 1, cost: 0 },
    2: { bonus: 0.92, cost: 5000 },
    3: { bonus: 0.84, cost: 15000 },
    4: { bonus: 0.76, cost: 30000 },
    5: { bonus: 0.68, cost: 50000 },
    6: { bonus: 0.6, cost: 80000 },
}

export const SEEDS: Seed[] = [
    {
        type: 'solar',
        name: 'Solgrass',
        level: 1,
        growthTime: 1,
        xpGain: 20,
        igcYield: 30,
        plantEnergy: 1,
        harvestEnergy: 1,
        recoveryRate: 1.0,
        price: 300,
        levelRequired: 1,
    },
    {
        type: 'solar',
        name: 'Firebush',
        level: 2,
        growthTime: 5,
        xpGain: 50,
        igcYield: 200,
        plantEnergy: 5,
        harvestEnergy: 5,
        recoveryRate: 1.0,
        price: 450,
        levelRequired: 2,
    },
    {
        type: 'solar',
        name: 'Sunvine',
        level: 3,
        growthTime: 60,
        xpGain: 100,
        igcYield: 250,
        plantEnergy: 7,
        harvestEnergy: 7,
        recoveryRate: 1.0,
        price: 700,
        levelRequired: 3,
    },
    {
        type: 'solar',
        name: 'Photsyn',
        level: 4,
        growthTime: 300,
        xpGain: 200,
        igcYield: 500,
        plantEnergy: 12,
        harvestEnergy: 12,
        recoveryRate: 0.95,
        price: 1300,
        levelRequired: 4,
    },
    {
        type: 'solar',
        name: 'Blazeen',
        level: 5,
        growthTime: 3600,
        xpGain: 300,
        igcYield: 600,
        plantEnergy: 20,
        harvestEnergy: 20,
        recoveryRate: 0.9,
        price: 1550,
        levelRequired: 5,
    },
    {
        type: 'solar',
        name: 'Aurofern',
        level: 6,
        growthTime: 7200,
        xpGain: 400,
        igcYield: 1150,
        plantEnergy: 25,
        harvestEnergy: 25,
        recoveryRate: 0.85,
        price: 1750,
        levelRequired: 6,
    },
    {
        type: 'solar',
        name: 'Inflare',
        level: 7,
        growthTime: 14400,
        xpGain: 500,
        igcYield: 1500,
        plantEnergy: 30,
        harvestEnergy: 30,
        recoveryRate: 0.8,
        price: 2800,
        levelRequired: 7,
    },
    {
        type: 'solar',
        name: 'Sunpetal',
        level: 8,
        growthTime: 34200,
        xpGain: 600,
        igcYield: 2000,
        plantEnergy: 35,
        harvestEnergy: 35,
        recoveryRate: 0.75,
        price: 3200,
        levelRequired: 8,
    },
    {
        type: 'solar',
        name: 'Helthorn',
        level: 9,
        growthTime: 39600,
        xpGain: 800,
        igcYield: 2200,
        plantEnergy: 40,
        harvestEnergy: 40,
        recoveryRate: 0.7,
        price: 3600,
        levelRequired: 9,
    },
    {
        type: 'solar',
        name: 'Novorchid',
        level: 10,
        growthTime: 86400,
        xpGain: 1000,
        igcYield: 6000,
        plantEnergy: 50,
        harvestEnergy: 50,
        recoveryRate: 0.65,
        price: 15000,
        levelRequired: 10,
    },
    {
        type: 'hydrogen',
        name: 'Dewbud',
        level: 1,
        growthTime: 2,
        xpGain: 100,
        igcYield: 40,
        plantEnergy: 3,
        harvestEnergy: 3,
        recoveryRate: 1.0,
        price: 200,
        levelRequired: 1,
    },
    {
        type: 'hydrogen',
        name: 'Mistleaf',
        level: 2,
        growthTime: 10,
        xpGain: 200,
        igcYield: 200,
        plantEnergy: 7,
        harvestEnergy: 7,
        recoveryRate: 1.0,
        price: 350,
        levelRequired: 2,
    },
    {
        type: 'hydrogen',
        name: 'Dripod',
        level: 3,
        growthTime: 300,
        xpGain: 300,
        igcYield: 250,
        plantEnergy: 8,
        harvestEnergy: 8,
        recoveryRate: 1.0,
        price: 600,
        levelRequired: 3,
    },
    {
        type: 'hydrogen',
        name: 'Geysera',
        level: 4,
        growthTime: 600,
        xpGain: 250,
        igcYield: 350,
        plantEnergy: 10,
        harvestEnergy: 10,
        recoveryRate: 0.95,
        price: 900,
        levelRequired: 4,
    },
    {
        type: 'hydrogen',
        name: 'Nepreed',
        level: 5,
        growthTime: 1800,
        xpGain: 300,
        igcYield: 450,
        plantEnergy: 15,
        harvestEnergy: 15,
        recoveryRate: 0.9,
        price: 1200,
        levelRequired: 5,
    },
    {
        type: 'hydrogen',
        name: 'Aquafern',
        level: 6,
        growthTime: 5400,
        xpGain: 450,
        igcYield: 1100,
        plantEnergy: 25,
        harvestEnergy: 25,
        recoveryRate: 0.85,
        price: 1500,
        levelRequired: 6,
    },
    {
        type: 'hydrogen',
        name: 'Tidrop',
        level: 7,
        growthTime: 12600,
        xpGain: 600,
        igcYield: 1500,
        plantEnergy: 30,
        harvestEnergy: 30,
        recoveryRate: 0.8,
        price: 3000,
        levelRequired: 7,
    },
    {
        type: 'hydrogen',
        name: 'Plasprout',
        level: 8,
        growthTime: 28800,
        xpGain: 900,
        igcYield: 1500,
        plantEnergy: 30,
        harvestEnergy: 30,
        recoveryRate: 0.75,
        price: 3200,
        levelRequired: 8,
    },
    {
        type: 'hydrogen',
        name: 'Cryolily',
        level: 9,
        growthTime: 43200,
        xpGain: 1000,
        igcYield: 2500,
        plantEnergy: 45,
        harvestEnergy: 45,
        recoveryRate: 0.7,
        price: 3600,
        levelRequired: 9,
    },
    {
        type: 'hydrogen',
        name: 'Stormlet',
        level: 10,
        growthTime: 79200,
        xpGain: 1500,
        igcYield: 5500,
        plantEnergy: 50,
        harvestEnergy: 50,
        recoveryRate: 0.65,
        price: 14000,
        levelRequired: 10,
    },
    {
        type: 'carbon',
        name: 'Mossroot',
        level: 1,
        growthTime: 3,
        xpGain: 50,
        igcYield: 50,
        plantEnergy: 2,
        harvestEnergy: 2,
        recoveryRate: 1.0,
        price: 250,
        levelRequired: 1,
    },
    {
        type: 'carbon',
        name: 'Cindleaf',
        level: 2,
        growthTime: 5,
        xpGain: 100,
        igcYield: 150,
        plantEnergy: 6,
        harvestEnergy: 6,
        recoveryRate: 1.0,
        price: 400,
        levelRequired: 2,
    },
    {
        type: 'carbon',
        name: 'Fungloom',
        level: 3,
        growthTime: 180,
        xpGain: 150,
        igcYield: 300,
        plantEnergy: 9,
        harvestEnergy: 9,
        recoveryRate: 1.0,
        price: 650,
        levelRequired: 3,
    },
    {
        type: 'carbon',
        name: 'Embroot',
        level: 4,
        growthTime: 240,
        xpGain: 250,
        igcYield: 550,
        plantEnergy: 15,
        harvestEnergy: 15,
        recoveryRate: 0.95,
        price: 1000,
        levelRequired: 4,
    },
    {
        type: 'carbon',
        name: 'Charblu',
        level: 5,
        growthTime: 3000,
        xpGain: 400,
        igcYield: 700,
        plantEnergy: 25,
        harvestEnergy: 25,
        recoveryRate: 0.9,
        price: 1200,
        levelRequired: 5,
    },
    {
        type: 'carbon',
        name: 'Shadivy',
        level: 6,
        growthTime: 7200,
        xpGain: 450,
        igcYield: 1250,
        plantEnergy: 30,
        harvestEnergy: 30,
        recoveryRate: 0.85,
        price: 1450,
        levelRequired: 6,
    },
    {
        type: 'carbon',
        name: 'Cindberry',
        level: 7,
        growthTime: 10800,
        xpGain: 700,
        igcYield: 1800,
        plantEnergy: 40,
        harvestEnergy: 40,
        recoveryRate: 0.8,
        price: 3000,
        levelRequired: 7,
    },
    {
        type: 'carbon',
        name: 'Ashbloom',
        level: 8,
        growthTime: 25200,
        xpGain: 800,
        igcYield: 2500,
        plantEnergy: 40,
        harvestEnergy: 40,
        recoveryRate: 0.75,
        price: 5350,
        levelRequired: 8,
    },
    {
        type: 'carbon',
        name: 'Onyxthis',
        level: 9,
        growthTime: 36000,
        xpGain: 1000,
        igcYield: 3000,
        plantEnergy: 50,
        harvestEnergy: 50,
        recoveryRate: 0.7,
        price: 7000,
        levelRequired: 9,
    },
    {
        type: 'carbon',
        name: 'Titree',
        level: 10,
        growthTime: 82800,
        xpGain: 1300,
        igcYield: 7500,
        plantEnergy: 60,
        harvestEnergy: 60,
        recoveryRate: 0.65,
        price: 20000,
        levelRequired: 10,
    },
]
