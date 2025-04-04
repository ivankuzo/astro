import { BoostsByEffect, FieldNumber, getBoost } from '@astro/astro-farm-game-core'

import { createGameService, findGameByWalletAddress } from '../../models/game'

export const useGrowthTimeReductionBoost = async (
    walletAddress: string,
    fieldNumber: FieldNumber,
    boostType: BoostsByEffect<'growthTimeReduction'>
) => {
    const game = await findGameByWalletAddress(walletAddress)
    const gameService = createGameService(game)

    gameService.subBoosts(boostType, 1)
    gameService.reduceRemainingGrowthTime(fieldNumber, boostType)

    await game.save()
    return game
}

export const useEnergyRestoreBoost = async (
    walletAddress: string,
    boostType: BoostsByEffect<'energyRestore'>
) => {
    const game = await findGameByWalletAddress(walletAddress)
    const gameService = createGameService(game)

    const boost = getBoost(boostType)

    gameService.subBoosts(boostType, 1)
    gameService.addEnergy(boost.effect.value)

    await game.save()
    return game
}
