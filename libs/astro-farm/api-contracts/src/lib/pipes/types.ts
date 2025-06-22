import { PipesLevel } from '@astro/astro-farm-game-core'
import { submitPipesGameResultSchema } from './schema'
import { z } from 'zod'

export type GetPipesGameResponse = PipesLevel

export type SubmitPipesGameResultRequest = z.infer<typeof submitPipesGameResultSchema>
