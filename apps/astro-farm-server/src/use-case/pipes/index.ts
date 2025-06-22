import { createGameService, findGameByWalletAddress } from '../../models/game'
import { PipesGameService, PipesGameRepo } from '../../models/pipes-game'
import {
    areLevelMapsEqual,
    BoostId,
    LevelMap,
    randomizeLevelMap,
} from '@astro/astro-farm-game-core'

export const findCurrentPipesGame = async (walletAddress: string) => {
    const pipesGame = await PipesGameRepo.findCurrentGame(walletAddress)
    const map = randomizeLevelMap(pipesGame.level.map)
    return {
        map,
        source: pipesGame.level.source,
    }
}

export const submitPipesGameResult = async (walletAddress: string, solution: LevelMap) => {
    const REWARD = {
        boost: {
            id: 'energy_50',
            amount: 1,
        },
    }

    const pipesGame = await PipesGameRepo.findCurrentGame(walletAddress)

    const isSolved = areLevelMapsEqual(pipesGame.level.map, solution)

    if (!isSolved) {
        throw new Error('Game not solved')
    }

    const game = await findGameByWalletAddress(walletAddress)
    const gameService = createGameService(game)

    await PipesGameService.submitResult(walletAddress)

    gameService.addBoosts(REWARD.boost.id as BoostId, REWARD.boost.amount)

    await game.save()

    return game
}
