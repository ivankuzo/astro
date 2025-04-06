import { getLevelByXp } from './xp'

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
    2: { bonus: 0.92, cost: 500 },
    3: { bonus: 0.84, cost: 1500 },
    4: { bonus: 0.76, cost: 3000 },
    5: { bonus: 0.68, cost: 5000 },
    6: { bonus: 0.6, cost: 8000 },
}

export const SEEDS: Seed[] = [
    // Solar Seeds
    {
        type: 'solar',
        name: 'Solgrass',
        level: 1,
        growthTime: 3,
        xpGain: 7.5,
        igcYield: 11,
        plantEnergy: 4,
        harvestEnergy: 4,
        recoveryRate: 1.0,
        price: 30,
        levelRequired: 1,
    },
    {
        type: 'solar',
        name: 'Flareberry',
        level: 2,
        growthTime: 5,
        xpGain: 15.0,
        igcYield: 22,
        plantEnergy: 10,
        harvestEnergy: 10,
        recoveryRate: 1.0,
        price: 60,
        levelRequired: 2,
    },
    {
        type: 'solar',
        name: 'Sunvine',
        level: 3,
        growthTime: 60,
        xpGain: 22.5,
        igcYield: 33,
        plantEnergy: 11,
        harvestEnergy: 11,
        recoveryRate: 1.0,
        price: 90,
        levelRequired: 3,
    },
    {
        type: 'solar',
        name: 'Photosynthia',
        level: 4,
        growthTime: 300,
        xpGain: 30.0,
        igcYield: 66,
        plantEnergy: 12,
        harvestEnergy: 12,
        recoveryRate: 0.95,
        price: 120,
        levelRequired: 4,
    },
    {
        type: 'solar',
        name: 'Blazelily',
        level: 5,
        growthTime: 3600,
        xpGain: 37.5,
        igcYield: 77,
        plantEnergy: 17,
        harvestEnergy: 17,
        recoveryRate: 0.9,
        price: 150,
        levelRequired: 5,
    },
    {
        type: 'solar',
        name: 'Aurora Fern',
        level: 6,
        growthTime: 7200,
        xpGain: 45.0,
        igcYield: 88,
        plantEnergy: 20,
        harvestEnergy: 20,
        recoveryRate: 0.85,
        price: 180,
        levelRequired: 6,
    },
    {
        type: 'solar',
        name: 'Inferno Cactus',
        level: 7,
        growthTime: 14400,
        xpGain: 79.5,
        igcYield: 116,
        plantEnergy: 30,
        harvestEnergy: 30,
        recoveryRate: 0.8,
        price: 210,
        levelRequired: 7,
    },
    {
        type: 'solar',
        name: 'Solaris Bloom',
        level: 8,
        growthTime: 28800,
        xpGain: 90.0,
        igcYield: 132,
        plantEnergy: 35,
        harvestEnergy: 35,
        recoveryRate: 0.75,
        price: 240,
        levelRequired: 8,
    },
    {
        type: 'solar',
        name: 'Heliothorn',
        level: 9,
        growthTime: 43200,
        xpGain: 102.0,
        igcYield: 149,
        plantEnergy: 41,
        harvestEnergy: 41,
        recoveryRate: 0.7,
        price: 270,
        levelRequired: 9,
    },
    {
        type: 'solar',
        name: 'Supernova Orchid',
        level: 10,
        growthTime: 86400,
        xpGain: 562.5,
        igcYield: 495,
        plantEnergy: 50,
        harvestEnergy: 50,
        recoveryRate: 0.65,
        price: 990,
        levelRequired: 10,
    },

    // Hydrogen Seeds
    {
        type: 'hydrogen',
        name: 'Dewbud',
        level: 1,
        growthTime: 3,
        xpGain: 13.5,
        igcYield: 10,
        plantEnergy: 5,
        harvestEnergy: 5,
        recoveryRate: 1.0,
        price: 30,
        levelRequired: 1,
    },
    {
        type: 'hydrogen',
        name: 'Mistleaf',
        level: 2,
        growthTime: 10,
        xpGain: 22.5,
        igcYield: 22,
        plantEnergy: 6,
        harvestEnergy: 6,
        recoveryRate: 1.0,
        price: 60,
        levelRequired: 2,
    },
    {
        type: 'hydrogen',
        name: 'Hydropod',
        level: 3,
        growthTime: 300,
        xpGain: 30.0,
        igcYield: 33,
        plantEnergy: 8,
        harvestEnergy: 8,
        recoveryRate: 1.0,
        price: 90,
        levelRequired: 3,
    },
    {
        type: 'hydrogen',
        name: 'Geyserbloom',
        level: 4,
        growthTime: 600,
        xpGain: 37.5,
        igcYield: 44,
        plantEnergy: 11,
        harvestEnergy: 11,
        recoveryRate: 0.95,
        price: 120,
        levelRequired: 4,
    },
    {
        type: 'hydrogen',
        name: 'Neptune Reed',
        level: 5,
        growthTime: 1800,
        xpGain: 45.0,
        igcYield: 61,
        plantEnergy: 14,
        harvestEnergy: 14,
        recoveryRate: 0.9,
        price: 150,
        levelRequired: 5,
    },
    {
        type: 'hydrogen',
        name: 'Aquafern',
        level: 6,
        growthTime: 5400,
        xpGain: 52.5,
        igcYield: 73,
        plantEnergy: 19,
        harvestEnergy: 19,
        recoveryRate: 0.85,
        price: 180,
        levelRequired: 6,
    },
    {
        type: 'hydrogen',
        name: 'Tidefruit',
        level: 7,
        growthTime: 14400,
        xpGain: 90.0,
        igcYield: 127,
        plantEnergy: 29,
        harvestEnergy: 29,
        recoveryRate: 0.8,
        price: 210,
        levelRequired: 7,
    },
    {
        type: 'hydrogen',
        name: 'Plasmabud',
        level: 8,
        growthTime: 28800,
        xpGain: 102.0,
        igcYield: 132,
        plantEnergy: 33,
        harvestEnergy: 33,
        recoveryRate: 0.75,
        price: 240,
        levelRequired: 8,
    },
    {
        type: 'hydrogen',
        name: 'CryoLily',
        level: 9,
        growthTime: 43200,
        xpGain: 112.5,
        igcYield: 149,
        plantEnergy: 43,
        harvestEnergy: 43,
        recoveryRate: 0.7,
        price: 270,
        levelRequired: 9,
    },
    {
        type: 'hydrogen',
        name: 'Stormlotus',
        level: 10,
        growthTime: 86400,
        xpGain: 574.5,
        igcYield: 495,
        plantEnergy: 51,
        harvestEnergy: 51,
        recoveryRate: 0.65,
        price: 1050,
        levelRequired: 10,
    },

    // Carbon Seeds
    {
        type: 'carbon',
        name: 'Mossroot',
        level: 1,
        growthTime: 3,
        xpGain: 8.25,
        igcYield: 12,
        plantEnergy: 5,
        harvestEnergy: 5,
        recoveryRate: 1.0,
        price: 30,
        levelRequired: 1,
    },
    {
        type: 'carbon',
        name: 'Cinderleaf',
        level: 2,
        growthTime: 5,
        xpGain: 14.85,
        igcYield: 22,
        plantEnergy: 9,
        harvestEnergy: 9,
        recoveryRate: 1.0,
        price: 60,
        levelRequired: 2,
    },
    {
        type: 'carbon',
        name: 'Fungal Sprout',
        level: 3,
        growthTime: 57,
        xpGain: 24.75,
        igcYield: 36,
        plantEnergy: 15,
        harvestEnergy: 15,
        recoveryRate: 1.0,
        price: 90,
        levelRequired: 3,
    },
    {
        type: 'carbon',
        name: 'Emberstalk',
        level: 4,
        growthTime: 285,
        xpGain: 33.0,
        igcYield: 48,
        plantEnergy: 18,
        harvestEnergy: 18,
        recoveryRate: 0.95,
        price: 120,
        levelRequired: 4,
    },
    {
        type: 'carbon',
        name: 'Charbloom',
        level: 5,
        growthTime: 3420,
        xpGain: 41.25,
        igcYield: 60,
        plantEnergy: 22,
        harvestEnergy: 22,
        recoveryRate: 0.9,
        price: 150,
        levelRequired: 5,
    },
    {
        type: 'carbon',
        name: 'Shadowvine',
        level: 6,
        growthTime: 6840,
        xpGain: 49.5,
        igcYield: 72,
        plantEnergy: 29,
        harvestEnergy: 29,
        recoveryRate: 0.85,
        price: 180,
        levelRequired: 6,
    },
    {
        type: 'carbon',
        name: 'Coalberry',
        level: 7,
        growthTime: 13680,
        xpGain: 87.45,
        igcYield: 126,
        plantEnergy: 37,
        harvestEnergy: 37,
        recoveryRate: 0.8,
        price: 210,
        levelRequired: 7,
    },
    {
        type: 'carbon',
        name: 'Ashbloom',
        level: 8,
        growthTime: 27360,
        xpGain: 113.85,
        igcYield: 223,
        plantEnergy: 41,
        harvestEnergy: 41,
        recoveryRate: 0.75,
        price: 240,
        levelRequired: 8,
    },
    {
        type: 'carbon',
        name: 'Onyx Thistle',
        level: 9,
        growthTime: 41040,
        xpGain: 129.03,
        igcYield: 290,
        plantEnergy: 49,
        harvestEnergy: 49,
        recoveryRate: 0.7,
        price: 270,
        levelRequired: 9,
    },
    {
        type: 'carbon',
        name: 'Titanwood',
        level: 10,
        growthTime: 82080,
        xpGain: 711.56,
        igcYield: 670,
        plantEnergy: 59,
        harvestEnergy: 59,
        recoveryRate: 0.65,
        price: 1100,
        levelRequired: 10,
    },

];
