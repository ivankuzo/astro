const LEVEL_SPLIT = 11

const EARLY_BASE_XP = 100
const EARLY_MULTIPLIER = 250
const EARLY_EXPONENT = 1.6

const LATE_BASE_XP = 1000
const LATE_MULTIPLIER = 400
const LATE_EXPONENT = 1.8

const getXpAtThresholdLevel = (): number => {
    const levelBase = LEVEL_SPLIT - 1
    return Math.round(LATE_MULTIPLIER * Math.pow(levelBase, LATE_EXPONENT) + LATE_BASE_XP)
}

const THRESHOLD_XP = getXpAtThresholdLevel()

export const getXpForLevel = (level: number): number => {
    if (level < 2) return 0

    const base = level - 1

    if (level < LEVEL_SPLIT) {
        return Math.round(EARLY_MULTIPLIER * Math.pow(base, EARLY_EXPONENT) + EARLY_BASE_XP)
    } else {
        return Math.round(LATE_MULTIPLIER * Math.pow(base, LATE_EXPONENT) + LATE_BASE_XP)
    }
}

export const getLevelByXp = (xp: number): number => {
    if (xp < EARLY_BASE_XP) return 1

    if (xp < THRESHOLD_XP) {
        const level = 1 + Math.pow((xp - EARLY_BASE_XP) / EARLY_MULTIPLIER, 1 / EARLY_EXPONENT)
        return Math.floor(level)
    } else {
        const level = 1 + Math.pow((xp - LATE_BASE_XP) / LATE_MULTIPLIER, 1 / LATE_EXPONENT)
        return Math.floor(level)
    }
}

export const getPreviousLevelThreshold = (xp: number): number => {
    const level = getLevelByXp(xp)
    return getXpForLevel(level)
}

export const getNextLevelThreshold = (xp: number): number => {
    const level = getLevelByXp(xp)
    return getXpForLevel(level + 1)
}

export interface XpGainLevelDetails {
    boost: number
    cost: number
}

export const XP_GAIN_LEVELS: Record<number, XpGainLevelDetails> = {
    1: { boost: 1, cost: 0 },
    2: { boost: 1.05, cost: 5000 },
    3: { boost: 1.1, cost: 15000 },
    4: { boost: 1.15, cost: 30000 },
    5: { boost: 1.2, cost: 50000 },
    6: { boost: 1.25, cost: 80000 },
}
