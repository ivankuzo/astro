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
    {
        type: 'carbon',
        name: 'Mossroot',
        level: 1,
        growthTime: 3,
        xpGain: 8,
        igcYield: 17,
        plantEnergy: 2,
        harvestEnergy: 2,
        recoveryRate: 1.0,
        price: 22,
        levelRequired: 1
    },
    {
        type: 'carbon',
        name: 'Cinderleaf',
        level: 2,
        growthTime: 5,
        xpGain: 13,
        igcYield: 49,
        plantEnergy: 6,
        harvestEnergy: 6,
        recoveryRate: 1.0,
        price: 40,
        levelRequired: 2
    },
    {
        type: 'carbon',
        name: 'Fungal Sprout',
        level: 3,
        growthTime: 57,
        xpGain: 22,
        igcYield: 58,
        plantEnergy: 9,
        harvestEnergy: 9,
        recoveryRate: 1.0,
        price: 65,
        levelRequired: 3
    },
    {
        type: 'carbon',
        name: 'Emberstalk',
        level: 4,
        growthTime: 285,
        xpGain: 31,
        igcYield: 95,
        plantEnergy: 15,
        harvestEnergy: 15,
        recoveryRate: 0.95,
        price: 96,
        levelRequired: 4
    },
    {
        type: 'carbon',
        name: 'Charbloom',
        level: 5,
        growthTime: 3420,
        xpGain: 58,
        igcYield: 165,
        plantEnergy: 22,
        harvestEnergy: 22,
        recoveryRate: 0.9,
        price: 120,
        levelRequired: 5
    },
    {
        type: 'carbon',
        name: 'Shadowvine',
        level: 6,
        growthTime: 6840,
        xpGain: 78,
        igcYield: 190,
        plantEnergy: 29,
        harvestEnergy: 29,
        recoveryRate: 0.85,
        price: 144,
        levelRequired: 6
    },
    {
        type: 'carbon',
        name: 'Coalberry',
        level: 7,
        growthTime: 13680,
        xpGain: 94,
        igcYield: 206,
        plantEnergy: 37,
        harvestEnergy: 37,
        recoveryRate: 0.8,
        price: 302,
        levelRequired: 7
    },
    {
        type: 'carbon',
        name: 'Ashbloom',
        level: 8,
        growthTime: 27360,
        xpGain: 115,
        igcYield: 222,
        plantEnergy: 41,
        harvestEnergy: 41,
        recoveryRate: 0.75,
        price: 535,
        levelRequired: 8
    },
    {
        type: 'carbon',
        name: 'Onyx Thistle',
        level: 9,
        growthTime: 41040,
        xpGain: 169,
        igcYield: 290,
        plantEnergy: 49,
        harvestEnergy: 49,
        recoveryRate: 0.7,
        price: 696,
        levelRequired: 9
    },
    {
        type: 'carbon',
        name: 'Titanwood',
        level: 10,
        growthTime: 82080,
        xpGain: 230,
        igcYield: 531,
        plantEnergy: 59,
        harvestEnergy: 59,
        recoveryRate: 0.65,
        price: 2010,
        levelRequired: 10
    },
    {
        type: 'hydrogen',
        name: 'Dewbud',
        level: 1,
        growthTime: 3,
        xpGain: 17,
        igcYield: 21,
        plantEnergy: 3,
        harvestEnergy: 3,
        recoveryRate: 1.0,
        price: 18,
        levelRequired: 1
    },
    {
        type: 'hydrogen',
        name: 'Mistleaf',
        level: 2,
        growthTime: 10,
        xpGain: 29,
        igcYield: 41,
        plantEnergy: 6,
        harvestEnergy: 6,
        recoveryRate: 1.0,
        price: 40,
        levelRequired: 2
    },
    {
        type: 'hydrogen',
        name: 'Hydropod',
        level: 3,
        growthTime: 300,
        xpGain: 39,
        igcYield: 51,
        plantEnergy: 8,
        harvestEnergy: 8,
        recoveryRate: 1.0,
        price: 59,
        levelRequired: 3
    },
    {
        type: 'hydrogen',
        name: 'Geyserbloom',
        level: 4,
        growthTime: 600,
        xpGain: 48,
        igcYield: 66,
        plantEnergy: 11,
        harvestEnergy: 11,
        recoveryRate: 0.95,
        price: 88,
        levelRequired: 4
    },
    {
        type: 'hydrogen',
        name: 'Neptune Reed',
        level: 5,
        growthTime: 1800,
        xpGain: 58,
        igcYield: 79,
        plantEnergy: 14,
        harvestEnergy: 14,
        recoveryRate: 0.9,
        price: 122,
        levelRequired: 5
    },
    {
        type: 'hydrogen',
        name: 'Aquafern',
        level: 6,
        growthTime: 5400,
        xpGain: 68,
        igcYield: 120,
        plantEnergy: 19,
        harvestEnergy: 19,
        recoveryRate: 0.85,
        price: 146,
        levelRequired: 6
    },
    {
        type: 'hydrogen',
        name: 'Tidefruit',
        level: 7,
        growthTime: 14400,
        xpGain: 117,
        igcYield: 190,
        plantEnergy: 29,
        harvestEnergy: 29,
        recoveryRate: 0.8,
        price: 305,
        levelRequired: 7
    },
    {
        type: 'hydrogen',
        name: 'Plasmabud',
        level: 8,
        growthTime: 28800,
        xpGain: 133,
        igcYield: 214,
        plantEnergy: 33,
        harvestEnergy: 33,
        recoveryRate: 0.75,
        price: 317,
        levelRequired: 8
    },
    {
        type: 'hydrogen',
        name: 'CryoLily',
        level: 9,
        growthTime: 43200,
        xpGain: 148,
        igcYield: 300,
        plantEnergy: 43,
        harvestEnergy: 43,
        recoveryRate: 0.7,
        price: 358,
        levelRequired: 9
    },
    {
        type: 'hydrogen',
        name: 'Stormlotus',
        level: 10,
        growthTime: 86400,
        xpGain: 390,
        igcYield: 499,
        plantEnergy: 51,
        harvestEnergy: 51,
        recoveryRate: 0.65,
        price: 1485,
        levelRequired: 10
    },
    {
        type: 'solar',
        name: 'Solgrass',
        level: 1,
        growthTime: 3,
        xpGain: 3,
        igcYield: 11,
        plantEnergy: 1,
        harvestEnergy: 1,
        recoveryRate: 1.0,
        price: 20,
        levelRequired: 1
    },
    {
        type: 'solar',
        name: 'Flareberry',
        level: 2,
        growthTime: 5,
        xpGain: 7,
        igcYield: 48,
        plantEnergy: 4,
        harvestEnergy: 4,
        recoveryRate: 1.0,
        price: 40,
        levelRequired: 2
    },
    {
        type: 'solar',
        name: 'Sunvine',
        level: 3,
        growthTime: 60,
        xpGain: 11,
        igcYield: 46,
        plantEnergy: 7,
        harvestEnergy: 7,
        recoveryRate: 1.0,
        price: 59,
        levelRequired: 3
    },
    {
        type: 'solar',
        name: 'Photosynthia',
        level: 4,
        growthTime: 300,
        xpGain: 22,
        igcYield: 84,
        plantEnergy: 12,
        harvestEnergy: 12,
        recoveryRate: 0.95,
        price: 132,
        levelRequired: 4
    },
    {
        type: 'solar',
        name: 'Blazelily',
        level: 5,
        growthTime: 3600,
        xpGain: 29,
        igcYield: 128,
        plantEnergy: 17,
        harvestEnergy: 17,
        recoveryRate: 0.9,
        price: 154,
        levelRequired: 5
    },
    {
        type: 'solar',
        name: 'Aurora Fern',
        level: 6,
        growthTime: 7200,
        xpGain: 41,
        igcYield: 160,
        plantEnergy: 20,
        harvestEnergy: 20,
        recoveryRate: 0.85,
        price: 176,
        levelRequired: 6
    },
    {
        type: 'solar',
        name: 'Inferno Cactus',
        level: 7,
        growthTime: 14400,
        xpGain: 87,
        igcYield: 210,
        plantEnergy: 30,
        harvestEnergy: 30,
        recoveryRate: 0.8,
        price: 278,
        levelRequired: 7
    },
    {
        type: 'solar',
        name: 'Solaris Bloom',
        level: 8,
        growthTime: 28800,
        xpGain: 99,
        igcYield: 228,
        plantEnergy: 35,
        harvestEnergy: 35,
        recoveryRate: 0.75,
        price: 317,
        levelRequired: 8
    },
    {
        type: 'solar',
        name: 'Heliothorn',
        level: 9,
        growthTime: 43200,
        xpGain: 112,
        igcYield: 246,
        plantEnergy: 41,
        harvestEnergy: 41,
        recoveryRate: 0.7,
        price: 358,
        levelRequired: 9
    },
    {
        type: 'solar',
        name: 'Supernova Orchid',
        level: 10,
        growthTime: 86400,
        xpGain: 374,
        igcYield: 379,
        plantEnergy: 50,
        harvestEnergy: 50,
        recoveryRate: 0.65,
        price: 1485,
        levelRequired: 10
    },
];

