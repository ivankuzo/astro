import { PipesGameModel } from './pipes-game.model'

export const submitResult = async (walletAddress: string) => {
    const game = await PipesGameModel.findOneAndUpdate(
        { walletAddress, isSubmitted: false },
        { isSubmitted: true }
    )
    return game
}

export const PipesGameService = {
    submitResult,
}
