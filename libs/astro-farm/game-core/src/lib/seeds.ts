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

const SEEDS: Seed[] = [
    {
        type: 'carbon',
        name: 'Mossroot',
        level: 1,
        growthTime: 3,
        xpGain: 8.0,
        igcYield: 17.0,
        plantEnergy: 2,
        harvestEnergy: 2,
        recoveryRate: 1.0,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'carbon',
        name: 'Cinderleaf',
        level: 2,
        growthTime: 5,
        xpGain: 13.0,
        igcYield: 49.0,
        plantEnergy: 6,
        harvestEnergy: 6,
        recoveryRate: 1.0,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'carbon',
        name: 'Fungal Sprout',
        level: 3,
        growthTime: 57,
        xpGain: 22.0,
        igcYield: 58.0,
        plantEnergy: 9,
        harvestEnergy: 9,
        recoveryRate: 1.0,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'carbon',
        name: 'Emberstalk',
        level: 4,
        growthTime: 285,
        xpGain: 31.0,
        igcYield: 95.0,
        plantEnergy: 15,
        harvestEnergy: 15,
        recoveryRate: 0.95,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'carbon',
        name: 'Charbloom',
        level: 5,
        growthTime: 3420,
        xpGain: 58.0,
        igcYield: 165.0,
        plantEnergy: 22,
        harvestEnergy: 22,
        recoveryRate: 0.9,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'carbon',
        name: 'Shadowvine',
        level: 6,
        growthTime: 6840,
        xpGain: 78.0,
        igcYield: 190.0,
        plantEnergy: 29,
        harvestEnergy: 29,
        recoveryRate: 0.85,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'carbon',
        name: 'Coalberry',
        level: 7,
        growthTime: 13680,
        xpGain: 94.0,
        igcYield: 206.0,
        plantEnergy: 37,
        harvestEnergy: 37,
        recoveryRate: 0.8,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'carbon',
        name: 'Ashbloom',
        level: 8,
        growthTime: 27360,
        xpGain: 115.0,
        igcYield: 222.0,
        plantEnergy: 41,
        harvestEnergy: 41,
        recoveryRate: 0.75,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'carbon',
        name: 'Onyx Thistle',
        level: 9,
        growthTime: 41040,
        xpGain: 169.0,
        igcYield: 290.0,
        plantEnergy: 49,
        harvestEnergy: 49,
        recoveryRate: 0.7,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'carbon',
        name: 'Titanwood',
        level: 10,
        growthTime: 82080,
        xpGain: 230.0,
        igcYield: 531.0,
        plantEnergy: 59,
        harvestEnergy: 59,
        recoveryRate: 0.65,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'hydrogen',
        name: 'Dewbud',
        level: 1,
        growthTime: 3,
        xpGain: 17.0,
        igcYield: 21.0,
        plantEnergy: 3,
        harvestEnergy: 3,
        recoveryRate: 1.0,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'hydrogen',
        name: 'Mistleaf',
        level: 2,
        growthTime: 10,
        xpGain: 29.0,
        igcYield: 41.0,
        plantEnergy: 6,
        harvestEnergy: 6,
        recoveryRate: 1.0,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'hydrogen',
        name: 'Hydropod',
        level: 3,
        growthTime: 300,
        xpGain: 39.0,
        igcYield: 51.0,
        plantEnergy: 8,
        harvestEnergy: 8,
        recoveryRate: 1.0,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'hydrogen',
        name: 'Geyserbloom',
        level: 4,
        growthTime: 600,
        xpGain: 48.0,
        igcYield: 66.0,
        plantEnergy: 11,
        harvestEnergy: 11,
        recoveryRate: 0.95,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'hydrogen',
        name: 'Neptune Reed',
        level: 5,
        growthTime: 1800,
        xpGain: 58.0,
        igcYield: 79.0,
        plantEnergy: 14,
        harvestEnergy: 14,
        recoveryRate: 0.9,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'hydrogen',
        name: 'Aquafern',
        level: 6,
        growthTime: 5400,
        xpGain: 68.0,
        igcYield: 120.0,
        plantEnergy: 19,
        harvestEnergy: 19,
        recoveryRate: 0.85,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'hydrogen',
        name: 'Tidefruit',
        level: 7,
        growthTime: 14400,
        xpGain: 117.0,
        igcYield: 190.0,
        plantEnergy: 29,
        harvestEnergy: 29,
        recoveryRate: 0.8,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'hydrogen',
        name: 'Plasmabud',
        level: 8,
        growthTime: 28800,
        xpGain: 133.0,
        igcYield: 214.0,
        plantEnergy: 33,
        harvestEnergy: 33,
        recoveryRate: 0.75,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'hydrogen',
        name: 'CryoLily',
        level: 9,
        growthTime: 43200,
        xpGain: 148.0,
        igcYield: 300.0,
        plantEnergy: 43,
        harvestEnergy: 43,
        recoveryRate: 0.7,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'hydrogen',
        name: 'Stormlotus',
        level: 10,
        growthTime: 86400,
        xpGain: 390.0,
        igcYield: 499.0,
        plantEnergy: 51,
        harvestEnergy: 51,
        recoveryRate: 0.65,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'solar',
        name: 'Solgrass',
        level: 1,
        growthTime: 3,
        xpGain: 3.0,
        igcYield: 11.0,
        plantEnergy: 1,
        harvestEnergy: 1,
        recoveryRate: 1.0,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'solar',
        name: 'Flareberry',
        level: 2,
        growthTime: 5,
        xpGain: 7.0,
        igcYield: 48.0,
        plantEnergy: 4,
        harvestEnergy: 4,
        recoveryRate: 1.0,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'solar',
        name: 'Sunvine',
        level: 3,
        growthTime: 60,
        xpGain: 11.0,
        igcYield: 46.0,
        plantEnergy: 7,
        harvestEnergy: 7,
        recoveryRate: 1.0,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'solar',
        name: 'Photosynthia',
        level: 4,
        growthTime: 300,
        xpGain: 22.0,
        igcYield: 84.0,
        plantEnergy: 12,
        harvestEnergy: 12,
        recoveryRate: 0.95,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'solar',
        name: 'Blazelily',
        level: 5,
        growthTime: 3600,
        xpGain: 29.0,
        igcYield: 128.0,
        plantEnergy: 17,
        harvestEnergy: 17,
        recoveryRate: 0.9,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'solar',
        name: 'Aurora Fern',
        level: 6,
        growthTime: 7200,
        xpGain: 41.0,
        igcYield: 160.0,
        plantEnergy: 20,
        harvestEnergy: 20,
        recoveryRate: 0.85,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'solar',
        name: 'Inferno Cactus',
        level: 7,
        growthTime: 14400,
        xpGain: 87.0,
        igcYield: 210.0,
        plantEnergy: 30,
        harvestEnergy: 30,
        recoveryRate: 0.8,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'solar',
        name: 'Solaris Bloom',
        level: 8,
        growthTime: 28800,
        xpGain: 99.0,
        igcYield: 228.0,
        plantEnergy: 35,
        harvestEnergy: 35,
        recoveryRate: 0.75,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'solar',
        name: 'Heliothorn',
        level: 9,
        growthTime: 43200,
        xpGain: 112.0,
        igcYield: 246.0,
        plantEnergy: 41,
        harvestEnergy: 41,
        recoveryRate: 0.7,
        price: 0,
        levelRequired: 0
    },
    {
        type: 'solar',
        name: 'Supernova Orchid',
        level: 10,
        growthTime: 86400,
        xpGain: 374.0,
        igcYield: 379.0,
        plantEnergy: 50,
        harvestEnergy: 50,
        recoveryRate: 0.65,
        price: 0,
        levelRequired: 0
    }
]

export const getSeed = (seedId: SeedId): Seed => {
    const seed = SEEDS.find(seed => `${seed.type}_${seed.level}` === seedId)
    if (!seed) {
        throw new Error(`Seed with id ${seedId} not found`)
    }
    return seed
}
