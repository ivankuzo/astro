import { saveNonce } from '../repository'
import { generateNonce } from '../utils'

export const createOrUpdateNonce = async (walletAddress: string) => {
    const nonce = generateNonce()
    await saveNonce(walletAddress, nonce)
    return nonce
}
