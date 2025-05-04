export type BoostType = 'growthTime' | 'energy'

export type BoostId<T extends BoostType = BoostType> = `${T}_${number}`

export interface Boost {
    type: BoostType
    name: string
    description: string
    effect: number
    price: number
}
export type BoostInventory = Record<BoostId, number>

export const getBoost = (boostId: BoostId): Boost => {
    const boost = BOOSTS.find(boost => `${boost.type}_${boost.effect}` === boostId)
    if (!boost) {
        throw new Error(`Boost with id ${boostId} not found`)
    }
    return boost
}

export const getBoostId = (boost: Boost): BoostId => {
    return `${boost.type}_${boost.effect}` as BoostId
}

export const getBoostsByType = <T extends BoostType>(type: T): Boost[] => {
    return BOOSTS.filter(boost => boost.type === type)
}

export const getBoostIdsByType = <T extends BoostType>(type: T): BoostId<T>[] => {
    return BOOSTS.filter(boost => boost.type === type).map(
        boost => `${boost.type}_${boost.effect}` as BoostId<T>
    )
}

export const BOOSTS: Boost[] = [
    {
        type: 'growthTime',
        name: 'Fertile Pulse',
        description: 'Reduces growth time on one planted field (25% of remaining growth time)',
        effect: 25,
        price: 1000,
    },
    {
        type: 'growthTime',
        name: 'Hyper Fertility',
        description: 'Reduces growth time on one planted field (50% of remaining growth time)',
        effect: 50,
        price: 2500,
    },
    {
        type: 'energy',
        name: 'Nano Charge',
        description: 'Restore 50 points of energy',
        effect: 50,
        price: 1800,
    },
    {
        type: 'energy',
        name: 'Giga Charge',
        description: 'Restore 100 points of energy',
        effect: 100,
        price: 3000,
    },
    {
        type: 'energy',
        name: 'Energy Pack',
        description: 'Restore 300 points of energy',
        effect: 300,
        price: 8500,
    },
    {
        type: 'energy',
        name: 'Energy Pack',
        description: 'Restore 600 points of energy',
        effect: 600,
        price: 16000,
    },
]
