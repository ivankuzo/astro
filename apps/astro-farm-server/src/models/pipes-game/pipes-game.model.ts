import { PipesGame, generateLevel } from '@astro/astro-farm-game-core'
import mongoose from 'mongoose'

const pipesGameSchema = new mongoose.Schema<PipesGame>(
    {
        walletAddress: { type: String, required: true },
        level: {
            type: mongoose.Schema.Types.Mixed,
            default: () => {
                const level = generateLevel()
                return {
                    map: level.map,
                    source: level.source,
                }
            },
            required: true,
        },
        isSubmitted: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    { timestamps: true }
)

export const PipesGameModel = mongoose.model('pipes-game', pipesGameSchema)
