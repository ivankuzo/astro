import { findGameByWalletAddress } from '../../models/game'

export const getGame = async (walletAddress: string) => {
    const game = await findGameByWalletAddress(walletAddress)
    return game
}
