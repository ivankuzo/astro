const levelThresholds = [0, 25, 100, 250, 500, 900, 1500, 2350, 3500, 5000]

export const getLevelByXp = (xp: number) => {
    const index = levelThresholds.findIndex(threshold => xp < threshold)
    return index === -1 ? levelThresholds.length : index
}

export const getPreviousLevelThreshold = (xp: number): number => {
    const level = getLevelByXp(xp)
    return level > 0 ? levelThresholds[level - 1] : 0
}

export const getNextLevelThreshold = (xp: number): number => {
    const index = levelThresholds.findIndex(threshold => xp < threshold)
    return index === -1 ? levelThresholds[levelThresholds.length - 1] : levelThresholds[index]
}

export interface XpGainLevelDetails {
    boost: number
    cost: number
}

export const XP_GAIN_LEVELS: Record<number, XpGainLevelDetails> = {
    1: { boost: 1, cost: 0 },
    2: { boost: 1.05, cost: 500 },
    3: { boost: 1.1, cost: 1500 },
    4: { boost: 1.15, cost: 3000 },
    5: { boost: 1.2, cost: 5000 },
    6: { boost: 1.25, cost: 8000 },
}
