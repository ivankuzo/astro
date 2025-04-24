import { z } from 'zod'

import {
    BOOSTS,
    BoostId,
    DomeUpgradeType,
    FieldNumber,
    SeedId,
    getBoostIdsByType,
} from '@astro/astro-farm-game-core'

const fieldNumberSchema = z
    .number()
    .int()
    .min(1)
    .max(12)
    .refine((v): v is FieldNumber => true)

const seedIdSchema = z
    .string()
    .regex(/^(carbon|hydrogen|solar)_([1-9]|10)$/)
    .refine((v): v is SeedId => true)

// const createBoostIdSchema = <T extends BoostType | undefined = undefined>(type?: T) => {
//     if (type) {
//         const boostIds = getBoostIdsByType(type as BoostType)
//         return z
//             .enum(boostIds as [string, ...string[]])
//             .refine((v): v is BoostId<T & BoostType> => true)
//     }

//     const allBoostIds = BOOSTS.map(boost => `${boost.type}_${boost.effect}`)
//     return z.enum(allBoostIds as [string, ...string[]]).refine((v): v is BoostId => true)
// }

const boostIdSchema = z
    .string()
    .refine((id): id is BoostId => BOOSTS.some(boost => `${boost.type}_${boost.effect}` === id), {
        message: 'Invalid boost ID',
    })

// Для конкретных типов - использует пайп для добавления проверки префикса
const growthTimeReductionBoostIdSchema = boostIdSchema.pipe(
    z
        .string()
        .startsWith('growthTimeReduction_')
        .transform(v => v as BoostId<'growthTimeReduction'>)
)

const energyRestoreBoostIdSchema = boostIdSchema.pipe(
    z
        .string()
        .startsWith('energyRestore_')
        .transform(v => v as BoostId<'energyRestore'>)
)

const domeUpgradeTypeSchema = z
    .nativeEnum(DomeUpgradeType)
    .refine((v): v is DomeUpgradeType => true)

export const plantSchema = z.object({
    body: z.object({
        fieldNumber: fieldNumberSchema,
        seedId: seedIdSchema,
    }),
})

export const harvestSchema = z.object({
    body: z.object({
        fieldNumber: fieldNumberSchema,
    }),
})

export const buySeedsSchema = z.object({
    body: z.object({
        seedId: seedIdSchema,
        amount: z.number().int().min(1),
    }),
})

export const buyBoostsSchema = z.object({
    body: z.object({
        boostId: boostIdSchema,
        amount: z.number().int().min(1),
    }),
})

export const upgradeDomeSchema = z.object({
    body: z.object({
        type: domeUpgradeTypeSchema,
    }),
})

export const growthTimeReductionBoostSchema = z.object({
    body: z.object({
        boostId: growthTimeReductionBoostIdSchema,
        fieldNumber: fieldNumberSchema,
    }),
})

export const energyRestoreBoostSchema = z.object({
    body: z.object({
        boostId: energyRestoreBoostIdSchema,
    }),
})

//const boostTypeSchema = z.string().refine((v): v is BoostType => Object.keys(BOOSTS).includes(v))

// const growthTimeReductionBoostIdSchema = z
//     .enum(getBoostIdsByType('growthTimeReduction') as [string, ...string[]])
//     .refine((v): v is BoostId<'growthTimeReduction'> => true)

// const energyRestoreBoostIdSchema = z
//     .enum(getBoostIdsByType('energyRestore') as [string, ...string[]])
//     .refine((v): v is BoostId<'energyRestore'> => true)
