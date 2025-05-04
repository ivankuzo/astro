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
const growthTimeBoostIdSchema = boostIdSchema.pipe(
    z
        .string()
        .startsWith('growthTime_')
        .transform(v => v as BoostId<'growthTime'>)
)

const energyBoostIdSchema = boostIdSchema.pipe(
    z
        .string()
        .startsWith('energy_')
        .transform(v => v as BoostId<'energy'>)
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

export const growthTimeBoostSchema = z.object({
    body: z.object({
        boostId: growthTimeBoostIdSchema,
        fieldNumber: fieldNumberSchema,
    }),
})

export const energyBoostSchema = z.object({
    body: z.object({
        boostId: energyBoostIdSchema,
    }),
})

//const boostTypeSchema = z.string().refine((v): v is BoostType => Object.keys(BOOSTS).includes(v))

// const growthTimeBoostIdSchema = z
//     .enum(getBoostIdsByType('growthTime') as [string, ...string[]])
//     .refine((v): v is BoostId<'growthTime'> => true)

// const energyBoostIdSchema = z
//     .enum(getBoostIdsByType('energy') as [string, ...string[]])
//     .refine((v): v is BoostId<'energy'> => true)
