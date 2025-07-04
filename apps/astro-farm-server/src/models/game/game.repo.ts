import { GameModel } from './game.model'
import { LeaderboardEntry } from '@astro/astro-farm-api-contracts'

export const findGameByWalletAddress = async (walletAddress: string) => {
    return GameModel.findOneAndUpdate(
        { walletAddress },
        { $setOnInsert: { walletAddress } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    )
}

export const getTop30ByXp = async (): Promise<LeaderboardEntry[]> => {
    return GameModel.find({}, { walletAddress: 1, xp: 1, _id: 0 }).sort({ xp: -1 }).limit(30).lean()
}
