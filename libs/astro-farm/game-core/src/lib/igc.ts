export interface igcYieldLevelDetails {
    bonus: number
    cost: number
}

export const IGC_GAIN_LEVELS: Record<number, igcYieldLevelDetails> = {
    1: { bonus: 1, cost: 0 },
    2: { bonus: 1.08, cost: 500 },
    3: { bonus: 1.12, cost: 1500 },
    4: { bonus: 1.18, cost: 3000 },
    5: { bonus: 1.25, cost: 5000 },
    6: { bonus: 1.35, cost: 8000 },
}
