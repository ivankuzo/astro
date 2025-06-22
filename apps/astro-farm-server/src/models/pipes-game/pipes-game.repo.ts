import { PipesGameModel } from './pipes-game.model'

export const findCurrentGame = async (walletAddress: string) => {
    let game = await PipesGameModel.findOne({ walletAddress, isSubmitted: false })
    if (!game) {
        game = await PipesGameModel.create({ walletAddress })
    }
    return game
}

export const PipesGameRepo = {
    findCurrentGame,
}
