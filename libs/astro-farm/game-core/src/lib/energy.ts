import { getUnixTime } from 'date-fns'
import { Game } from './game'

export const ENERGY_REGEN = 30 / 60 / 60

//export const ENERGY_REGEN_LEVEL_BONUS = 0.2 / 60 / 60

//export const MAX_ENERGY_REGEN_LEVEL_BONUS = 1 / 60 / 60

export const ENERGY_CAPACITY_LEVELS: Record<number, EnergyCapacityLevelDetails> = {
    1: { capacity: 100, cost: 0 },
    2: { capacity: 150, cost: 5000 },
    3: { capacity: 200, cost: 15000 },
    4: { capacity: 300, cost: 30000 },
    5: { capacity: 450, cost: 50000 },
    6: { capacity: 600, cost: 80000 },
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

export const calculateCurrentEnergy = (game: Game): number => {
    const now = getUnixTime(new Date())
    const elapsedSeconds = now - game.energy.lastSpentUnix
    const baseRegen = elapsedSeconds * ENERGY_REGEN
    //const bonusRegen = elapsedSeconds * getRegenBonus(level)
    //const totalRegen = baseRegen + bonusRegen
    const totalRegen = baseRegen

    const { capacity } = ENERGY_CAPACITY_LEVELS[game.dome.energyCapacity]
    return Math.min(game.energy.lastValue + totalRegen, capacity)
}
