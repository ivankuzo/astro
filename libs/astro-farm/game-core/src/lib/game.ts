import { BoostInventory } from './boosts'
import { Dome } from './dome'
import { Energy } from './energy'
import { Fields } from './fields'
import { SeedInventory } from './seeds'

export type Game = {
    walletAddress: string
    xp: number
    igc: number
    energy: Energy
    dome: Dome
    fields: Fields
    seedInventory: SeedInventory
    boostInventory: BoostInventory
}
