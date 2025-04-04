import { IGC_GAIN_LEVELS } from './igc'
import { GROWTH_SPEED_LEVELS } from './seeds'
import { ENERGY_CAPACITY_LEVELS } from './energy'
import { XP_GAIN_LEVELS } from './xp'
import { FIELD_UNLOCKS, FieldNumber } from './fields'

export enum DomeUpgradeType {
    totalUnlockedFields = 'totalUnlockedFields',
    energyCapacity = 'energyCapacity',
    igcYield = 'igcYield',
    growthSpeed = 'growthSpeed',
    xpGain = 'xpGain',
}

export type Dome = {
    [DomeUpgradeType.igcYield]: number
    [DomeUpgradeType.growthSpeed]: number
    [DomeUpgradeType.energyCapacity]: number
    [DomeUpgradeType.xpGain]: number
    [DomeUpgradeType.totalUnlockedFields]: FieldNumber
}

export type UpgradeLevelConfig<T extends object = object> = {
    cost: number
    levelRequired?: number
} & T

export const DOME_UPGRADES: Record<DomeUpgradeType, Record<number, UpgradeLevelConfig>> = {
    [DomeUpgradeType.igcYield]: IGC_GAIN_LEVELS,
    [DomeUpgradeType.growthSpeed]: GROWTH_SPEED_LEVELS,
    [DomeUpgradeType.energyCapacity]: ENERGY_CAPACITY_LEVELS,
    [DomeUpgradeType.xpGain]: XP_GAIN_LEVELS,
    [DomeUpgradeType.totalUnlockedFields]: FIELD_UNLOCKS,
}

export const getMaxLevel = (type: DomeUpgradeType): number => {
    return Object.keys(DOME_UPGRADES[type]).length
}

export const canUpgrade = (dome: Dome, type: DomeUpgradeType): boolean => {
    const currentLevel = dome[type]
    const maxLevel = getMaxLevel(type)

    return currentLevel < maxLevel
}

export const validateUpgrade = (dome: Dome, type: DomeUpgradeType): void => {
    if (!canUpgrade(dome, type)) {
        const messages: Record<DomeUpgradeType, string> = {
            [DomeUpgradeType.igcYield]: 'IGC yield already maxed out',
            [DomeUpgradeType.growthSpeed]: 'Growth speed already maxed out',
            [DomeUpgradeType.energyCapacity]: 'Energy capacity already maxed out',
            [DomeUpgradeType.xpGain]: 'XP gain already maxed out',
            [DomeUpgradeType.totalUnlockedFields]: 'All fields are already unlocked',
        }

        throw new Error(messages[type])
    }
}

export const getUpgradeCost = (dome: Dome, type: DomeUpgradeType): number | null => {
    if (!canUpgrade(dome, type)) {
        return null
    }

    const currentLevel = dome[type]
    const nextLevel = currentLevel + 1
    const nextLevelConfig = DOME_UPGRADES[type][nextLevel]
    return nextLevelConfig.cost
}

// export const isFieldLocked = (dome: Dome, fieldNumber: FieldNumber): boolean => {
//     return fieldNumber > dome[DomeUpgradeType.totalUnlockedFields]
// }
