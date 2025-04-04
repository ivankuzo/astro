import { getAddress, verifyMessage } from 'ethers'

import { AppError } from '@astro/server/errors'

import { deleteNonce, findNonce } from '../repository'

export const validateNonce = async (walletAddress: string, signature: string) => {
    const nonceValue = await findNonce(walletAddress)
    const signer = verifyMessage(nonceValue, signature)

    if (walletAddress !== getAddress(signer)) throw new AppError('Invalid wallet')

    await deleteNonce(walletAddress)
}
