import { AppError } from '@astro/server/errors'
import { redis } from '@astro/server/redis'

const NONCE_PREFIX = 'nonce:'

const NONCE_TTL = 120

export const saveNonce = async (walletAddress: string, value: string): Promise<void> => {
    await redis.set(`${NONCE_PREFIX}${walletAddress}`, value, NONCE_TTL)
}

export const findNonce = async (walletAddress: string): Promise<string> => {
    const nonce = await redis.get<string>(`${NONCE_PREFIX}${walletAddress}`)

    if (!nonce) {
        throw new AppError('Invalid nonce')
    }

    return nonce
}

export const deleteNonce = async (walletAddress: string): Promise<void> => {
    await redis.del(`${NONCE_PREFIX}${walletAddress}`)
}
