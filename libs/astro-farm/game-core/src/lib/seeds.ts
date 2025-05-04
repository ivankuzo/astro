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
    // Solar Seeds
    {
        type: 'solar',
        name: 'Solgrass',
        level: 1,
        growthTime: 1,
        xpGain: 20,
        igcYield: 40,
        plantEnergy: 1,
        harvestEnergy: 1,
        recoveryRate: 1.0,
        price: 200,
        levelRequired: 1,
    },
    {
        type: 'solar',
        name: 'Firebush',
        level: 2,
        growthTime: 5,
        xpGain: 40,
        igcYield: 210,
        plantEnergy: 5,
        harvestEnergy: 5,
        recoveryRate: 1.0,
        price: 400,
        levelRequired: 2,
    },
    {
        type: 'solar',
        name: 'Sunvine',
        level: 3,
        growthTime: 60,
        xpGain: 50,
        igcYield: 270,
        plantEnergy: 7,
        harvestEnergy: 7,
        recoveryRate: 1.0,
        price: 590,
        levelRequired: 3,
    },
    {
        type: 'solar',
        name: 'Photsyn',
        level: 4,
        growthTime: 300,
        xpGain: 90,
        igcYield: 540,
        plantEnergy: 12,
        harvestEnergy: 12,
        recoveryRate: 0.95,
        price: 1320,
        levelRequired: 4,
    },
    {
        type: 'solar',
        name: 'Blazeen',
        level: 5,
        growthTime: 3600,
        xpGain: 150,
        igcYield: 610,
        plantEnergy: 17,
        harvestEnergy: 17,
        recoveryRate: 0.9,
        price: 1540,
        levelRequired: 5,
    },
    {
        type: 'solar',
        name: 'Aurofern',
        level: 6,
        growthTime: 7200,
        xpGain: 200,
        igcYield: 1000,
        plantEnergy: 20,
        harvestEnergy: 20,
        recoveryRate: 0.85,
        price: 1760,
        levelRequired: 6,
    },
    {
        type: 'solar',
        name: 'Inflare',
        level: 7,
        growthTime: 14400,
        xpGain: 490,
        igcYield: 1220,
        plantEnergy: 30,
        harvestEnergy: 30,
        recoveryRate: 0.8,
        price: 2780,
        levelRequired: 7,
    },
    {
        type: 'solar',
        name: 'Sunpetal',
        level: 8,
        growthTime: 28800,
        xpGain: 520,
        igcYield: 1100,
        plantEnergy: 35,
        harvestEnergy: 35,
        recoveryRate: 0.75,
        price: 3170,
        levelRequired: 8,
    },
    {
        type: 'solar',
        name: 'Helthorn',
        level: 9,
        growthTime: 43200,
        xpGain: 590,
        igcYield: 1500,
        plantEnergy: 41,
        harvestEnergy: 41,
        recoveryRate: 0.7,
        price: 3580,
        levelRequired: 9,
    },
    {
        type: 'solar',
        name: 'Novorchid',
        level: 10,
        growthTime: 86400,
        xpGain: 1440,
        igcYield: 5310,
        plantEnergy: 50,
        harvestEnergy: 50,
        recoveryRate: 0.65,
        price: 14850,
        levelRequired: 10,
    },

    // Hydrogen Seeds
    {
        type: 'hydrogen',
        name: 'Dewbud',
        level: 1,
        growthTime: 2,
        xpGain: 80,
        igcYield: 90,
        plantEnergy: 3,
        harvestEnergy: 3,
        recoveryRate: 1.0,
        price: 180,
        levelRequired: 1,
    },
    {
        type: 'hydrogen',
        name: 'Mistleaf',
        level: 2,
        growthTime: 10,
        xpGain: 140,
        igcYield: 190,
        plantEnergy: 7,
        harvestEnergy: 7,
        recoveryRate: 1.0,
        price: 400,
        levelRequired: 2,
    },
    {
        type: 'hydrogen',
        name: 'Dripod',
        level: 3,
        growthTime: 300,
        xpGain: 200,
        igcYield: 270,
        plantEnergy: 8,
        harvestEnergy: 8,
        recoveryRate: 1.0,
        price: 690,
        levelRequired: 3,
    },
    {
        type: 'hydrogen',
        name: 'Geysera',
        level: 4,
        growthTime: 600,
        xpGain: 240,
        igcYield: 390,
        plantEnergy: 11,
        harvestEnergy: 11,
        recoveryRate: 0.95,
        price: 880,
        levelRequired: 4,
    },
    {
        type: 'hydrogen',
        name: 'Nepreed',
        level: 5,
        growthTime: 1800,
        xpGain: 340,
        igcYield: 440,
        plantEnergy: 14,
        harvestEnergy: 14,
        recoveryRate: 0.9,
        price: 1220,
        levelRequired: 5,
    },
    {
        type: 'hydrogen',
        name: 'Aquafern',
        level: 6,
        growthTime: 5400,
        xpGain: 400,
        igcYield: 770,
        plantEnergy: 19,
        harvestEnergy: 19,
        recoveryRate: 0.85,
        price: 1460,
        levelRequired: 6,
    },
    {
        type: 'hydrogen',
        name: 'Tidrop',
        level: 7,
        growthTime: 14400,
        xpGain: 530,
        igcYield: 1190,
        plantEnergy: 29,
        harvestEnergy: 29,
        recoveryRate: 0.8,
        price: 3050,
        levelRequired: 7,
    },
    {
        type: 'hydrogen',
        name: 'Plasprout',
        level: 8,
        growthTime: 28800,
        xpGain: 620,
        igcYield: 1390,
        plantEnergy: 33,
        harvestEnergy: 33,
        recoveryRate: 0.75,
        price: 3170,
        levelRequired: 8,
    },
    {
        type: 'hydrogen',
        name: 'Cryolily',
        level: 9,
        growthTime: 43200,
        xpGain: 780,
        igcYield: 1680,
        plantEnergy: 43,
        harvestEnergy: 43,
        recoveryRate: 0.7,
        price: 3580,
        levelRequired: 9,
    },
    {
        type: 'hydrogen',
        name: 'Stormlet',
        level: 10,
        growthTime: 86400,
        xpGain: 1890,
        igcYield: 5220,
        plantEnergy: 51,
        harvestEnergy: 51,
        recoveryRate: 0.65,
        price: 14850,
        levelRequired: 10,
    },

    // Carbon Seeds
    {
        type: 'carbon',
        name: 'Mossroot',
        level: 1,
        growthTime: 3,
        xpGain: 40,
        igcYield: 70,
        plantEnergy: 2,
        harvestEnergy: 2,
        recoveryRate: 1.0,
        price: 220,
        levelRequired: 1,
    },
    {
        type: 'carbon',
        name: 'Cindleaf',
        level: 2,
        growthTime: 5,
        xpGain: 60,
        igcYield: 250,
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
        growthTime: 57,
        xpGain: 110,
        igcYield: 340,
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
        growthTime: 285,
        xpGain: 150,
        igcYield: 610,
        plantEnergy: 15,
        harvestEnergy: 15,
        recoveryRate: 0.95,
        price: 960,
        levelRequired: 4,
    },
    {
        type: 'carbon',
        name: 'Charblu',
        level: 5,
        growthTime: 3420,
        xpGain: 290,
        igcYield: 770,
        plantEnergy: 22,
        harvestEnergy: 22,
        recoveryRate: 0.9,
        price: 1200,
        levelRequired: 5,
    },
    {
        type: 'carbon',
        name: 'Shadivy',
        level: 6,
        growthTime: 6840,
        xpGain: 390,
        igcYield: 1010,
        plantEnergy: 29,
        harvestEnergy: 29,
        recoveryRate: 0.85,
        price: 1440,
        levelRequired: 6,
    },
    {
        type: 'carbon',
        name: 'Cindberry',
        level: 7,
        growthTime: 13680,
        xpGain: 690,
        igcYield: 1190,
        plantEnergy: 37,
        harvestEnergy: 37,
        recoveryRate: 0.8,
        price: 3020,
        levelRequired: 7,
    },
    {
        type: 'carbon',
        name: 'Ashbloom',
        level: 8,
        growthTime: 27360,
        xpGain: 830,
        igcYield: 1400,
        plantEnergy: 41,
        harvestEnergy: 41,
        recoveryRate: 0.75,
        price: 5350,
        levelRequired: 8,
    },
    {
        type: 'carbon',
        name: 'Onyxthis',
        level: 9,
        growthTime: 41040,
        xpGain: 790,
        igcYield: 2290,
        plantEnergy: 49,
        harvestEnergy: 49,
        recoveryRate: 0.7,
        price: 6960,
        levelRequired: 9,
    },
    {
        type: 'carbon',
        name: 'Titree',
        level: 10,
        growthTime: 82080,
        xpGain: 1210,
        igcYield: 7550,
        plantEnergy: 59,
        harvestEnergy: 59,
        recoveryRate: 0.65,
        price: 20100,
        levelRequired: 10,
    },
]
