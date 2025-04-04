import { GameModel } from './game.model'

export const findGameByWalletAddress = async (walletAddress: string) => {
    return GameModel.findOneAndUpdate(
        { walletAddress },
        { $setOnInsert: { walletAddress } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    )
}
