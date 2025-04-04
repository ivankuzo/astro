import {
    IGC_GAIN_LEVELS,
    GROWTH_SPEED_LEVELS,
    ENERGY_CAPACITY_LEVELS,
    XP_GAIN_LEVELS,
} from '@astro/astro-farm-game-core'

import { getMaxLevel, DomeUpgradeType } from '@astro/astro-farm-game-core'

export const getUpgradeTitle = (upgradeType: DomeUpgradeType, currentLevel: number): string => {
    const maxLevel = getMaxLevel(upgradeType)

    if (currentLevel >= maxLevel) {
        return 'Max.'
    }

    if (upgradeType === DomeUpgradeType.totalUnlockedFields) {
        return `${currentLevel} Fields`
    }

    return `Level ${currentLevel}`
}

export const getName = (upgradeType: DomeUpgradeType): string => {
    switch (upgradeType) {
        case DomeUpgradeType.igcYield:
            return 'IGC Yield Increase'
        case DomeUpgradeType.growthSpeed:
            return 'Growth Speed Reduction'
        case DomeUpgradeType.energyCapacity:
            return 'Energy Capacity Increase'
        case DomeUpgradeType.xpGain:
            return 'XP Gain Boost'
        case DomeUpgradeType.totalUnlockedFields:
            return 'Unlock Fields'
    }
}

export const getImagePath = (upgradeType: DomeUpgradeType): string => {
    switch (upgradeType) {
        case DomeUpgradeType.igcYield:
            return 'dome-upgrades/igc-yield.png'
        case DomeUpgradeType.growthSpeed:
            return 'dome-upgrades/growth-speed.png'
        case DomeUpgradeType.energyCapacity:
            return 'dome-upgrades/energy-capacity.png'
        case DomeUpgradeType.xpGain:
            return 'dome-upgrades/xp-gain.png'
        case DomeUpgradeType.totalUnlockedFields:
            return 'dome-upgrades/total-unlocked-fields.png'
    }
}

export const getUpgradeValues = (
    upgradeType: DomeUpgradeType,
    currentLevel: number
): { current: string; next: string | null } => {
    const maxLevel = getMaxLevel(upgradeType)
    const isMaxLevel = currentLevel >= maxLevel

    if (upgradeType === DomeUpgradeType.totalUnlockedFields) {
        return {
            current: `${currentLevel}`,
            next: isMaxLevel ? null : '+1',
        }
    }

    if (upgradeType === DomeUpgradeType.igcYield) {
        const currentBonus = IGC_GAIN_LEVELS[currentLevel].bonus
        const currentPercent = Math.round((currentBonus - 1) * 100)

        if (isMaxLevel) {
            return { current: `${currentPercent}%`, next: null }
        }

        const nextBonus = IGC_GAIN_LEVELS[currentLevel + 1].bonus
        const nextPercent = Math.round((nextBonus / currentBonus - 1) * 100)

        return { current: `${currentPercent}%`, next: `+${nextPercent}%` }
    }

    if (upgradeType === DomeUpgradeType.growthSpeed) {
        const currentBonus = GROWTH_SPEED_LEVELS[currentLevel].bonus
        const currentPercent = Math.round((1 - currentBonus) * 100)

        if (isMaxLevel) {
            return { current: `-${currentPercent}%`, next: null }
        }

        const nextBonus = GROWTH_SPEED_LEVELS[currentLevel + 1].bonus
        const nextPercent = Math.round(((currentBonus - nextBonus) / currentBonus) * 100)

        return { current: `-${currentPercent}%`, next: `-${nextPercent}%` }
    }

    if (upgradeType === DomeUpgradeType.energyCapacity) {
        const baseCapacity = ENERGY_CAPACITY_LEVELS[1].capacity
        const currentCapacity = ENERGY_CAPACITY_LEVELS[currentLevel].capacity
        const currentPercent = Math.round((currentCapacity / baseCapacity - 1) * 100)

        if (isMaxLevel) {
            return { current: `${currentPercent}%`, next: null }
        }

        const nextCapacity = ENERGY_CAPACITY_LEVELS[currentLevel + 1].capacity
        const nextPercent = Math.round(((nextCapacity - currentCapacity) / currentCapacity) * 100)

        return { current: `${currentPercent}%`, next: `+${nextPercent}%` }
    }

    if (upgradeType === DomeUpgradeType.xpGain) {
        const currentBoost = XP_GAIN_LEVELS[currentLevel].boost
        const currentPercent = Math.round((currentBoost - 1) * 100)

        if (isMaxLevel) {
            return { current: `${currentPercent}%`, next: null }
        }

        const nextBoost = XP_GAIN_LEVELS[currentLevel + 1].boost
        const nextPercent = Math.round(((nextBoost - currentBoost) / currentBoost) * 100)

        return { current: `${currentPercent}%`, next: `+${nextPercent}%` }
    }

    return { current: '0%', next: null }
}
