export type BoostEffectType = 'growthTimeReduction' | 'energyRestore'

export type BoostType = 'fertilePulse' | 'hyperFertility' | 'energyPack'

export interface BoostEffect {
    type: BoostEffectType
    value: number
}

export interface Boost {
    name: string
    description: string
    effect: BoostEffect
    price: number
}

export type BoostInventory = Record<BoostType, number>

export type BoostsByEffect<T extends BoostEffectType> = Extract<
    BoostType,
    { [K in BoostType]: (typeof BOOSTS)[K]['effect']['type'] extends T ? K : never }[BoostType]
>

export const BOOSTS = {
    fertilePulse: {
        name: 'Fertile Pulse',
        description: 'Reduces growth time on one planted field (25% of remaining growth time)',
        effect: {
            type: 'growthTimeReduction',
            value: 0.75,
        },
        price: 100,
    },
    hyperFertility: {
        name: 'Hyper Fertility',
        description: 'Reduces growth time on one planted field (50% of remaining growth time)',
        effect: {
            type: 'growthTimeReduction',
            value: 0.5,
        },
        price: 250,
    },
    energyPack: {
        name: 'Energy Pack',
        description: 'Restore 100% of energy',
        effect: {
            type: 'energyRestore',
            value: 9999,
        },
        price: 300,
    },
} as const satisfies Record<BoostType, Boost>

export const getBoost = (type: BoostType): Boost => BOOSTS[type]
