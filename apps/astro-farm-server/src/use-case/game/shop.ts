import { BoostId, SeedId, getBoost, getSeed } from '@astro/astro-farm-game-core'

import { createGameService, findGameByWalletAddress } from '../../models/game'

export const buySeeds = async (walletAddress: string, seedId: SeedId, amount: number) => {
    const game = await findGameByWalletAddress(walletAddress)
    const gameService = createGameService(game)

    const seed = getSeed(seedId)

    if (gameService.getLevel() < seed.levelRequired) {
        throw new Error('Level requirement not met')
    }

    gameService.addSeeds(seedId, amount)
    gameService.subIgc(seed.price * amount)

    await game.save()
    return game
}

export const buyBoosts = async (walletAddress: string, boostId: BoostId, amount: number) => {
    const game = await findGameByWalletAddress(walletAddress)
    const gameService = createGameService(game)

    const boost = getBoost(boostId)

    gameService.addBoosts(boostId, amount)
    gameService.subIgc(boost.price * amount)

    await game.save()
    return game
}
