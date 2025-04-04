import {
    BoostType,
    BoostsByEffect,
    DomeUpgradeType,
    ENERGY_CAPACITY_LEVELS,
    FIELD_UNLOCKS,
    FieldNumber,
    GROWTH_SPEED_LEVELS,
    IGC_GAIN_LEVELS,
    SeedId,
    TOTAL_FIELDS,
    XP_GAIN_LEVELS,
    calculateCurrentEnergy,
    getBoost,
    getLevelByXp,
    getSeed,
    validateUpgrade,
} from '@astro/astro-farm-game-core'

import { getUnixTime } from 'date-fns'

import { GameDocument } from './game.model'

export const createGameService = (game: GameDocument) => {
    const getLevel = () => {
        return getLevelByXp(game.xp)
    }

    const getCurrentEnergy = () => {
        return calculateCurrentEnergy(game.energy, getLevel(), game.dome.energyCapacity)
    }

    const getField = (fieldNumber: FieldNumber) => {
        if (fieldNumber < 1 || fieldNumber > TOTAL_FIELDS) {
            throw new Error('Invalid field fieldNumber')
        }

        if (fieldNumber > game.dome.totalUnlockedFields) {
            throw new Error('Field is locked')
        }

        const field = game.fields[fieldNumber]
        return field
    }

    const getOccupiedField = (fieldNumber: FieldNumber) => {
        const field = getField(fieldNumber)
        if (field === null) {
            throw new Error('Field is empty')
        }
        return field
    }

    const getEmptyField = (fieldNumber: FieldNumber) => {
        const field = getField(fieldNumber)
        if (field !== null) {
            throw new Error('Field is planted')
        }
        return field
    }

    const subEnergy = (amount: number) => {
        const now = getUnixTime(new Date())
        const currentEnergy = getCurrentEnergy()
        if (currentEnergy < amount) {
            throw new Error('Not enough energy')
        }
        const newEnergy = currentEnergy - amount
        game.energy.lastValue = newEnergy
        game.energy.lastSpentUnix = now
    }

    const addEnergy = (amount: number) => {
        const { capacity } = ENERGY_CAPACITY_LEVELS[game.dome.energyCapacity]
        const newEnergy = Math.min(game.energy.lastValue + amount, capacity)
        game.energy.lastValue = newEnergy
    }

    const subIgc = (amount: number) => {
        if (game.igc < amount) {
            throw new Error('Not enough igc')
        }
        game.igc -= amount
    }

    const addIgc = (amount: number) => {
        const bonus = IGC_GAIN_LEVELS[game.dome.igcYield].bonus
        const igcToAdd = amount * bonus
        game.igc += igcToAdd
    }

    const addXp = (amount: number, applyBoost = true) => {
        const boost = applyBoost ? XP_GAIN_LEVELS[game.dome.xpGain].boost : 1
        const xpToAdd = amount * boost
        game.xp += xpToAdd
    }

    const addSeeds = (seedId: SeedId, amount: number) => {
        const currentAmount = game.seedInventory[seedId] || 0
        game.seedInventory[seedId] = currentAmount + amount
        game.markModified('seedInventory')
    }

    const subSeeds = (seedId: SeedId, amount: number) => {
        const currentAmount = game.seedInventory[seedId] || 0
        if (currentAmount < amount) {
            throw new Error('Not enough seeds')
        }

        const newAmount = currentAmount - amount
        if (newAmount === 0) {
            delete game.seedInventory[seedId]
        } else {
            game.seedInventory[seedId] = newAmount
        }
        game.markModified('seedInventory')
    }

    const addBoosts = (boostType: BoostType, amount: number) => {
        const currentAmount = game.boostInventory[boostType] || 0
        game.boostInventory[boostType] = currentAmount + amount
        game.markModified('boostInventory')
    }

    const subBoosts = (boostType: BoostType, amount: number) => {
        const currentAmount = game.boostInventory[boostType] || 0
        if (currentAmount < amount) {
            throw new Error('Not enough boosts')
        }

        const newAmount = currentAmount - amount
        if (newAmount === 0) {
            delete game.boostInventory[boostType]
        } else {
            game.boostInventory[boostType] = newAmount
        }
        game.markModified('boostInventory')
    }

    const placeSeedInField = (fieldNumber: FieldNumber, seedId: SeedId) => {
        const now = getUnixTime(new Date())
        getEmptyField(fieldNumber)

        const seed = getSeed(seedId)
        const { bonus } = GROWTH_SPEED_LEVELS[game.dome.growthSpeed]
        const maturedUnix = now + seed.growthTime * bonus

        game.fields[fieldNumber] = {
            seedId,
            plantedUnix: now,
            maturedUnix,
        }
    }

    const removePlantFromField = (fieldNumber: FieldNumber) => {
        const now = getUnixTime(new Date())
        const field = getOccupiedField(fieldNumber)
        if (now < field.maturedUnix) {
            throw new Error('Plant is not matured yet')
        }

        game.fields[fieldNumber] = null
    }

    const reduceRemainingGrowthTime = (
        fieldNumber: FieldNumber,
        boostType: BoostsByEffect<'growthTimeReduction'>
    ) => {
        const now = getUnixTime(new Date())
        const field = getOccupiedField(fieldNumber)
        if (now >= field.maturedUnix) {
            throw new Error('Plant is already matured')
        }

        const boost = getBoost(boostType)

        const remainingTime = field.maturedUnix - now
        const newRemainingTime = remainingTime * boost.effect.value
        const newMaturedUnix = now + newRemainingTime

        field.maturedUnix = newMaturedUnix
    }

    const upgradeIgcYieldLevel = () => {
        validateUpgrade(game.dome, DomeUpgradeType.igcYield)
        game.dome.igcYield += 1
    }

    const upgradeGrowthSpeedLevel = () => {
        validateUpgrade(game.dome, DomeUpgradeType.growthSpeed)
        game.dome.growthSpeed += 1
    }

    const upgradeEnergyCapacityLevel = () => {
        validateUpgrade(game.dome, DomeUpgradeType.energyCapacity)
        game.dome.energyCapacity += 1
    }

    const upgradeXpGainLevel = () => {
        validateUpgrade(game.dome, DomeUpgradeType.xpGain)
        game.dome.xpGain += 1
    }

    const upgradeTotalUnlockedFields = () => {
        validateUpgrade(game.dome, DomeUpgradeType.totalUnlockedFields)

        const { levelRequired } = FIELD_UNLOCKS[game.dome.totalUnlockedFields + 1]

        if (getLevel() < levelRequired) {
            throw new Error('Level is too low')
        }

        game.dome.totalUnlockedFields += 1
    }

    return {
        getCurrentEnergy,
        getLevel,
        getField,
        getOccupiedField,
        getEmptyField,

        subEnergy,
        addEnergy,

        subIgc,
        addIgc,

        addXp,

        subSeeds,
        addSeeds,

        addBoosts,
        subBoosts,

        placeSeedInField,
        removePlantFromField,
        reduceRemainingGrowthTime,

        upgradeIgcYieldLevel,
        upgradeGrowthSpeedLevel,
        upgradeEnergyCapacityLevel,
        upgradeXpGainLevel,
        upgradeTotalUnlockedFields,
    }
}
