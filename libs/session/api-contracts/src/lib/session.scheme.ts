import { ethers } from 'ethers'
import { object, string } from 'zod'

export const createNonceSchema = object({
    body: object({
        walletAddress: string().refine(address => {
            return ethers.isAddress(address)
        }),
    }),
})

export const verifyNonceSchema = object({
    body: object({
        walletAddress: string(),
        signature: string(),
    }),
})
