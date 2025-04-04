import mongoose from 'mongoose'

import {
    Dome,
    Energy,
    FieldNumber,
    Fields,
    Game,
    OccupiedField,
    TOTAL_FIELDS,
} from '@astro/astro-farm-game-core'
import { getUnixTime } from 'date-fns'

const GAME_DEFAULTS = {
    xp: 0,
    igc: 500,
    energy: 100,
    unlockedFields: 3,
}

export const initDefaultFields = () =>
    Object.fromEntries(Array.from({ length: TOTAL_FIELDS }, (_, i) => [i + 1, null])) as Fields

const EnergySchema = new mongoose.Schema<Energy>(
    {
        lastValue: { type: Number, required: true, default: GAME_DEFAULTS.energy },
        lastSpentUnix: {
            type: Number,
            required: true,
            default: () => getUnixTime(new Date()),
        },
    },
    { _id: false }
)

const DomeSchema = new mongoose.Schema<Dome>(
    {
        totalUnlockedFields: {
            type: Number,
            required: true,
            default: GAME_DEFAULTS.unlockedFields as FieldNumber,
        },
        energyCapacity: { type: Number, required: true, default: 1 },
        igcYield: { type: Number, required: true, default: 1 },
        growthSpeed: { type: Number, required: true, default: 1 },
        xpGain: { type: Number, required: true, default: 1 },
    },
    { _id: false }
)

const OccupiedFieldSchema = new mongoose.Schema<OccupiedField>(
    {
        seedId: { type: String, required: true },
        plantedUnix: { type: Number, required: true },
        maturedUnix: { type: Number, required: true },
    },
    { _id: false }
)

const FieldsSchema = new mongoose.Schema<Fields>(
    {
        1: { type: OccupiedFieldSchema, default: null },
        2: { type: OccupiedFieldSchema, default: null },
        3: { type: OccupiedFieldSchema, default: null },
        4: { type: OccupiedFieldSchema, default: null },
        5: { type: OccupiedFieldSchema, default: null },
        6: { type: OccupiedFieldSchema, default: null },
        7: { type: OccupiedFieldSchema, default: null },
        8: { type: OccupiedFieldSchema, default: null },
        9: { type: OccupiedFieldSchema, default: null },
        10: { type: OccupiedFieldSchema, default: null },
        11: { type: OccupiedFieldSchema, default: null },
        12: { type: OccupiedFieldSchema, default: null },
    },
    { _id: false }
)

const gameSchema = new mongoose.Schema<Game>(
    {
        walletAddress: { type: String, required: true, unique: true },
        xp: { type: Number, required: true, default: GAME_DEFAULTS.xp },
        igc: { type: Number, required: true, default: GAME_DEFAULTS.igc },
        energy: {
            type: EnergySchema,
            required: true,
            default: () => ({}),
        },
        dome: {
            type: DomeSchema,
            required: true,
            default: () => ({}),
        },
        fields: {
            type: FieldsSchema,
            required: true,
            default: () => initDefaultFields(),
        },
        seedInventory: {
            type: Object,
            default: () => {
                return {
                    solar_1: 1,
                    hydrogen_1: 1,
                    carbon_1: 1,
                }
            },
        },
        boostInventory: {
            type: Object,
            default: () => ({}),
        },
    },
    { minimize: false }
)

export type GameDocument = mongoose.Document & Game

export const GameModel = mongoose.model('Game', gameSchema)
