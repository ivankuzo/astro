import { SeedId } from './seeds'

export const TOTAL_FIELDS = 12

export type FieldNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type OccupiedField = {
    seedId: SeedId
    plantedUnix: number
    maturedUnix: number
}

export type EmptyField = null

export type Field = OccupiedField | EmptyField

export type Fields = Record<FieldNumber, Field>

export interface FieldUnlockDetails {
    cost: number
}

export const FIELD_UNLOCKS: Record<FieldNumber, FieldUnlockDetails> = {
    1: { cost: 0 },
    2: { cost: 0 },
    3: { cost: 0 },
    4: { cost: 312 },
    5: { cost: 625 },
    6: { cost: 1250 },
    7: { cost: 1563 },
    8: { cost: 1969 },
    9: { cost: 2375 },
    10: { cost: 2781 },
    11: { cost: 3188 },
    12: { cost: 3594 },
}

// export interface FieldUnlockDetails {
//     levelRequired: number
//     cost: number
// }

// export const FIELD_UNLOCKS: Record<FieldNumber, FieldUnlockDetails> = {
//     1: { levelRequired: 1, cost: 0 },
//     2: { levelRequired: 1, cost: 0 },
//     3: { levelRequired: 1, cost: 0 },
//     4: { levelRequired: 4, cost: 312 },
//     5: { levelRequired: 6, cost: 625 },
//     6: { levelRequired: 8, cost: 1250 },
//     7: { levelRequired: 10, cost: 1563 },
//     8: { levelRequired: 12, cost: 1969 },
//     9: { levelRequired: 14, cost: 2375 },
//     10: { levelRequired: 15, cost: 2781 },
//     11: { levelRequired: 17, cost: 3188 },
//     12: { levelRequired: 19, cost: 3594 },
// }
