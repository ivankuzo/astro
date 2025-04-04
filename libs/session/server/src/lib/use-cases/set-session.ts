import { Response } from 'express'

import * as jwt from 'jsonwebtoken'
import { SESSION_COOKIES } from '@astro/session-api-contracts'

import { CONFIG } from '../config'

export const setSession = (res: Response, walletAddress: string) => {
    const token = jwt.sign({ walletAddress }, CONFIG.secretJwt, {
        expiresIn: CONFIG.expiresIn,
    })

    res.cookie(SESSION_COOKIES.authToken, token, {
        httpOnly: true,
        maxAge: CONFIG.maxAge,
    })

    res.cookie(SESSION_COOKIES.userWallet, walletAddress, {
        maxAge: CONFIG.maxAge,
    })
}
