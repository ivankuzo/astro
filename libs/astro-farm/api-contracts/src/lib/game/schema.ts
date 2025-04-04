import { z } from 'zod'

import {
    BOOSTS,
    BoostType,
    BoostsByEffect,
    DomeUpgradeType,
    FieldNumber,
    SeedId,
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

const boostTypeSchema = z.string().refine((v): v is BoostType => Object.keys(BOOSTS).includes(v))

const growthTimeReductionBoostTypeSchema = z
    .enum(['fertilePulse', 'hyperFertility'])
    .refine((v): v is BoostsByEffect<'growthTimeReduction'> => true)

const energyRestoreBoostTypeSchema = z
    .enum(['energyPack'])
    .refine((v): v is BoostsByEffect<'energyRestore'> => true)

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
        boostType: boostTypeSchema,
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
        boostType: growthTimeReductionBoostTypeSchema,
        fieldNumber: fieldNumberSchema,
    }),
})

export const energyRestoreBoostSchema = z.object({
    body: z.object({
        boostType: energyRestoreBoostTypeSchema,
    }),
})
