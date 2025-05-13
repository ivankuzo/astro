const BASE_XP = 100
const MULTIPLIER = 250
const BASE_EXPONENT = 1.5
const EXPONENT_GROWTH = 0.03

export const getXpForLevel = (level: number): number => {
    if (level < 2) return 0
    const base = level - 1
    const exponent = BASE_EXPONENT + (base - 1) * EXPONENT_GROWTH
    return Math.round(MULTIPLIER * Math.pow(base, exponent) + BASE_XP)
}

export const getLevelByXp = (xp: number): number => {
    if (xp < BASE_XP) return 1

    let level = 1
    while (getXpForLevel(level + 1) <= xp) {
        level++
    }
    return level
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
