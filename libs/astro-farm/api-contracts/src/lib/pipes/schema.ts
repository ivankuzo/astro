import { z } from 'zod'
import { LevelMap, PipeShape } from '@astro/astro-farm-game-core'

const basePipeSchema = z.object({
    shape: z.enum([PipeShape.STRAIGHT, PipeShape.CORNER, PipeShape.TRIPLE, PipeShape.END]),
    orientation: z.number().min(0).max(3),
})

const levelMapSchema = z.array(z.array(basePipeSchema)).refine((v): v is LevelMap => true)

export const submitPipesGameResultSchema = z.object({
    body: z.object({
        solution: levelMapSchema,
    }),
})
