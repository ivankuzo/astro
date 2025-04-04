import { FieldNumber, SeedId, getSeed, shouldRecoverSeed } from '@astro/astro-farm-game-core'

import { createGameService, findGameByWalletAddress } from '../../models/game'

export const plant = async (walletAddress: string, fieldNumber: FieldNumber, seedId: SeedId) => {
    const game = await findGameByWalletAddress(walletAddress)
    const gameService = createGameService(game)

    const seed = getSeed(seedId)

    gameService.subSeeds(seedId, 1)
    gameService.subEnergy(seed.plantEnergy)
    gameService.placeSeedInField(fieldNumber, seedId)

    await game.save()
    return game
}

export const harvest = async (walletAddress: string, fieldNumber: FieldNumber) => {
    const game = await findGameByWalletAddress(walletAddress)
    const gameService = createGameService(game)

    const field = gameService.getOccupiedField(fieldNumber)
    const seedId = field.seedId
    const seed = getSeed(seedId)
    const isSeedRecovery = shouldRecoverSeed(seedId)

    if (isSeedRecovery) {
        gameService.addSeeds(seedId, 1)
    }
    gameService.subEnergy(seed.harvestEnergy)
    gameService.addXp(seed.xpGain)
    gameService.addIgc(seed.igcYield)
    gameService.removePlantFromField(fieldNumber)

    await game.save()
    return game
}
