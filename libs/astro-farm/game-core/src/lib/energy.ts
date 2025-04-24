import { getUnixTime } from 'date-fns'

export const ENERGY_REGEN = 12 / 60 / 60

//export const ENERGY_REGEN_LEVEL_BONUS = 0.2 / 60 / 60

//export const MAX_ENERGY_REGEN_LEVEL_BONUS = 1 / 60 / 60

export const ENERGY_CAPACITY_LEVELS: Record<number, EnergyCapacityLevelDetails> = {
    1: { capacity: 100, cost: 0 },
    2: { capacity: 150, cost: 500 },
    3: { capacity: 200, cost: 1500 },
    4: { capacity: 300, cost: 3000 },
    5: { capacity: 450, cost: 5000 },
    6: { capacity: 600, cost: 8000 },
}

// export const getRegenBonus = (level: number) => {
//     const bonus = ENERGY_REGEN_LEVEL_BONUS * level
//     return Math.min(bonus, MAX_ENERGY_REGEN_LEVEL_BONUS)
// }

export interface EnergyCapacityLevelDetails {
    capacity: number
    cost: number
}

export type Energy = {
    lastValue: number
    lastSpentUnix: number
}

export const calculateCurrentEnergy = (
    energy: Energy,
    level: number,
    energyCapacityLevel: number
): number => {
    const now = getUnixTime(new Date())
    const elapsedSeconds = now - energy.lastSpentUnix
    const baseRegen = elapsedSeconds * ENERGY_REGEN
    //const bonusRegen = elapsedSeconds * getRegenBonus(level)
    //const totalRegen = baseRegen + bonusRegen
    const totalRegen = baseRegen

    const { capacity } = ENERGY_CAPACITY_LEVELS[energyCapacityLevel]
    return Math.min(energy.lastValue + totalRegen, capacity)
}
