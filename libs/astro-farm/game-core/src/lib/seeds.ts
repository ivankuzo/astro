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
    level: number
    name: string
    growthTimeSeconds: number
    xp: number
    igc: number
    energy: {
        plant: number
        harvest: number
    }
    recoveryRate: number
}

export const seeds: Seed[] = [
    {
        type: 'carbon',
        level: 1,
        name: 'Mossroot',
        growthTimeSeconds: 3,
        xp: 8.0,
        igc: 17.0,
        energy: {
            plant: 2,
            harvest: 2
        },
        recoveryRate: 1.0
    },
    {
        type: 'carbon',
        level: 2,
        name: 'Cinderleaf',
        growthTimeSeconds: 5,
        xp: 13.0,
        igc: 49.0,
        energy: {
            plant: 6,
            harvest: 6
        },
        recoveryRate: 1.0
    },
    {
        type: 'carbon',
        level: 3,
        name: 'Fungal Sprout',
        growthTimeSeconds: 57,
        xp: 22.0,
        igc: 58.0,
        energy: {
            plant: 9,
            harvest: 9
        },
        recoveryRate: 1.0
    },
    {
        type: 'carbon',
        level: 4,
        name: 'Emberstalk',
        growthTimeSeconds: 285,
        xp: 31.0,
        igc: 95.0,
        energy: {
            plant: 15,
            harvest: 15
        },
        recoveryRate: 0.95
    },
    {
        type: 'carbon',
        level: 5,
        name: 'Charbloom',
        growthTimeSeconds: 3420,
        xp: 58.0,
        igc: 165.0,
        energy: {
            plant: 22,
            harvest: 22
        },
        recoveryRate: 0.9
    },
    {
        type: 'carbon',
        level: 6,
        name: 'Shadowvine',
        growthTimeSeconds: 6840,
        xp: 78.0,
        igc: 190.0,
        energy: {
            plant: 29,
            harvest: 29
        },
        recoveryRate: 0.85
    },
    {
        type: 'carbon',
        level: 7,
        name: 'Coalberry',
        growthTimeSeconds: 13680,
        xp: 94.0,
        igc: 206.0,
        energy: {
            plant: 37,
            harvest: 37
        },
        recoveryRate: 0.8
    },
    {
        type: 'carbon',
        level: 8,
        name: 'Ashbloom',
        growthTimeSeconds: 27360,
        xp: 115.0,
        igc: 222.0,
        energy: {
            plant: 41,
            harvest: 41
        },
        recoveryRate: 0.75
    },
    {
        type: 'carbon',
        level: 9,
        name: 'Onyx Thistle',
        growthTimeSeconds: 41040,
        xp: 169.0,
        igc: 290.0,
        energy: {
            plant: 49,
            harvest: 49
        },
        recoveryRate: 0.7
    },
    {
        type: 'carbon',
        level: 10,
        name: 'Titanwood',
        growthTimeSeconds: 82080,
        xp: 230.0,
        igc: 531.0,
        energy: {
            plant: 59,
            harvest: 59
        },
        recoveryRate: 0.65
    },
    {
        type: 'hydrogen',
        level: 1,
        name: 'Dewbud',
        growthTimeSeconds: 3,
        xp: 17.0,
        igc: 21.0,
        energy: {
            plant: 3,
            harvest: 3
        },
        recoveryRate: 1.0
    },
    {
        type: 'hydrogen',
        level: 2,
        name: 'Mistleaf',
        growthTimeSeconds: 10,
        xp: 29.0,
        igc: 41.0,
        energy: {
            plant: 6,
            harvest: 6
        },
        recoveryRate: 1.0
    },
    {
        type: 'hydrogen',
        level: 3,
        name: 'Hydropod',
        growthTimeSeconds: 300,
        xp: 39.0,
        igc: 51.0,
        energy: {
            plant: 8,
            harvest: 8
        },
        recoveryRate: 1.0
    },
    {
        type: 'hydrogen',
        level: 4,
        name: 'Geyserbloom',
        growthTimeSeconds: 600,
        xp: 48.0,
        igc: 66.0,
        energy: {
            plant: 11,
            harvest: 11
        },
        recoveryRate: 0.95
    },
    {
        type: 'hydrogen',
        level: 5,
        name: 'Neptune Reed',
        growthTimeSeconds: 1800,
        xp: 58.0,
        igc: 79.0,
        energy: {
            plant: 14,
            harvest: 14
        },
        recoveryRate: 0.9
    },
    {
        type: 'hydrogen',
        level: 6,
        name: 'Aquafern',
        growthTimeSeconds: 5400,
        xp: 68.0,
        igc: 120.0,
        energy: {
            plant: 19,
            harvest: 19
        },
        recoveryRate: 0.85
    },
    {
        type: 'hydrogen',
        level: 7,
        name: 'Tidefruit',
        growthTimeSeconds: 14400,
        xp: 117.0,
        igc: 190.0,
        energy: {
            plant: 29,
            harvest: 29
        },
        recoveryRate: 0.8
    },
    {
        type: 'hydrogen',
        level: 8,
        name: 'Plasmabud',
        growthTimeSeconds: 28800,
        xp: 133.0,
        igc: 214.0,
        energy: {
            plant: 33,
            harvest: 33
        },
        recoveryRate: 0.75
    },
    {
        type: 'hydrogen',
        level: 9,
        name: 'CryoLily',
        growthTimeSeconds: 43200,
        xp: 148.0,
        igc: 300.0,
        energy: {
            plant: 43,
            harvest: 43
        },
        recoveryRate: 0.7
    },
    {
        type: 'hydrogen',
        level: 10,
        name: 'Stormlotus',
        growthTimeSeconds: 86400,
        xp: 390.0,
        igc: 499.0,
        energy: {
            plant: 51,
            harvest: 51
        },
        recoveryRate: 0.65
    },
    {
        type: 'solar',
        level: 1,
        name: 'Solgrass',
        growthTimeSeconds: 3,
        xp: 3.0,
        igc: 11.0,
        energy: {
            plant: 1,
            harvest: 1
        },
        recoveryRate: 1.0
    },
    {
        type: 'solar',
        level: 2,
        name: 'Flareberry',
        growthTimeSeconds: 5,
        xp: 7.0,
        igc: 48.0,
        energy: {
            plant: 4,
            harvest: 4
        },
        recoveryRate: 1.0
    },
    {
        type: 'solar',
        level: 3,
        name: 'Sunvine',
        growthTimeSeconds: 60,
        xp: 11.0,
        igc: 46.0,
        energy: {
            plant: 7,
            harvest: 7
        },
        recoveryRate: 1.0
    },
    {
        type: 'solar',
        level: 4,
        name: 'Photosynthia',
        growthTimeSeconds: 300,
        xp: 22.0,
        igc: 84.0,
        energy: {
            plant: 12,
            harvest: 12
        },
        recoveryRate: 0.95
    },
    {
        type: 'solar',
        level: 5,
        name: 'Blazelily',
        growthTimeSeconds: 3600,
        xp: 29.0,
        igc: 128.0,
        energy: {
            plant: 17,
            harvest: 17
        },
        recoveryRate: 0.9
    },
    {
        type: 'solar',
        level: 6,
        name: 'Aurora Fern',
        growthTimeSeconds: 7200,
        xp: 41.0,
        igc: 160.0,
        energy: {
            plant: 20,
            harvest: 20
        },
        recoveryRate: 0.85
    },
    {
        type: 'solar',
        level: 7,
        name: 'Inferno Cactus',
        growthTimeSeconds: 14400,
        xp: 87.0,
        igc: 210.0,
        energy: {
            plant: 30,
            harvest: 30
        },
        recoveryRate: 0.8
    },
    {
        type: 'solar',
        level: 8,
        name: 'Solaris Bloom',
        growthTimeSeconds: 28800,
        xp: 99.0,
        igc: 228.0,
        energy: {
            plant: 35,
            harvest: 35
        },
        recoveryRate: 0.75
    },
    {
        type: 'solar',
        level: 9,
        name: 'Heliothorn',
        growthTimeSeconds: 43200,
        xp: 112.0,
        igc: 246.0,
        energy: {
            plant: 41,
            harvest: 41
        },
        recoveryRate: 0.7
    },
    {
        type: 'solar',
        level: 10,
        name: 'Supernova Orchid',
        growthTimeSeconds: 86400,
        xp: 374.0,
        igc: 379.0,
        energy: {
            plant: 50,
            harvest: 50
        },
        recoveryRate: 0.65
    }
];
