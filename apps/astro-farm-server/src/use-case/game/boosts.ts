import { BoostId, FieldNumber, getBoost } from '@astro/astro-farm-game-core'

import { createGameService, findGameByWalletAddress } from '../../models/game'

export const useGrowthTimeReductionBoost = async (
    walletAddress: string,
    fieldNumber: FieldNumber,
    boostId: BoostId<'growthTimeReduction'>
) => {
    const game = await findGameByWalletAddress(walletAddress)
    const gameService = createGameService(game)

    gameService.subBoosts(boostId, 1)
    gameService.reduceRemainingGrowthTime(fieldNumber, boostId)

    await game.save()
    return game
}

export const useEnergyRestoreBoost = async (
    walletAddress: string,
    boostId: BoostId<'energyRestore'>
) => {
    const game = await findGameByWalletAddress(walletAddress)
    const gameService = createGameService(game)

    const boost = getBoost(boostId)

    gameService.subBoosts(boostId, 1)
    gameService.addEnergy(boost.effect)

    await game.save()
    return game
}
