import {
    BoostId,
    DomeUpgradeType,
    ENERGY_CAPACITY_LEVELS,
    FieldNumber,
    SeedId,
    TOTAL_FIELDS,
    calculateCurrentEnergy,
    getBoost,
    getLevelByXp,
    getUpgradedSeed,
    validateUpgrade,
} from '@astro/astro-farm-game-core'

import { getUnixTime } from 'date-fns'

import { GameDocument } from './game.model'

export const createGameService = (game: GameDocument) => {
    const getLevel = () => {
        return getLevelByXp(game.xp)
    }

    const getCurrentEnergy = () => {
        return calculateCurrentEnergy(game)
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
        game.igc += amount
    }

    const addXp = (amount: number) => {
        game.xp += amount
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

    const addBoosts = (boostId: BoostId, amount: number) => {
        const currentAmount = game.boostInventory[boostId] || 0
        game.boostInventory[boostId] = currentAmount + amount
        game.markModified('boostInventory')
    }

    const subBoosts = (boostId: BoostId, amount: number) => {
        const currentAmount = game.boostInventory[boostId] || 0
        if (currentAmount < amount) {
            throw new Error('Not enough boosts')
        }

        const newAmount = currentAmount - amount
        if (newAmount === 0) {
            delete game.boostInventory[boostId]
        } else {
            game.boostInventory[boostId] = newAmount
        }
        game.markModified('boostInventory')
    }

    const placeSeedInField = (fieldNumber: FieldNumber, seedId: SeedId) => {
        const now = getUnixTime(new Date())
        getEmptyField(fieldNumber)

        const seed = getUpgradedSeed(seedId, game)
        const maturedUnix = now + seed.growthTime

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
        boostId: BoostId<'growthTime'>
    ) => {
        const now = getUnixTime(new Date())
        const field = getOccupiedField(fieldNumber)
        if (now >= field.maturedUnix) {
            throw new Error('Plant is already matured')
        }

        const boost = getBoost(boostId)

        const remainingTime = field.maturedUnix - now
        const newRemainingTime = remainingTime - (remainingTime * boost.effect) / 100
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
