import { Request, Response } from 'express'

import { getAddress } from 'ethers'

import {
    CreateNonceRequest,
    CreateNonceResponse,
    VerifyNonceRequest,
} from '@astro/session-api-contracts'

import { clearSession } from '../use-cases/clear-session'
import { createOrUpdateNonce } from '../use-cases/create-nonce'
import { setSession } from '../use-cases/set-session'
import { validateNonce } from '../use-cases/validate-nonce'

export const createNonce = async (
    req: Request<object, object, CreateNonceRequest['body']>,
    res: Response<CreateNonceResponse>
) => {
    const walletAddress = getAddress(req.body.walletAddress)
    const nonce = await createOrUpdateNonce(walletAddress)
    res.send({ nonce })
}

export const verifyNonce = async (
    req: Request<object, object, VerifyNonceRequest['body']>,
    res: Response
) => {
    const walletAddress = getAddress(req.body.walletAddress)
    const signature = req.body.signature

    await validateNonce(walletAddress, signature)
    setSession(res, walletAddress)
    res.end()
}

export const signOut = (req: Request, res: Response<void>) => {
    clearSession(res)
    res.end()
}
