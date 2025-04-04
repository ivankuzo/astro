import { NextFunction, Request, Response } from 'express'

import { getAddress } from 'ethers'
import { SESSION_COOKIES } from '@astro/session-api-contracts'

import { setSession } from '../use-cases/set-session'
import { isExpComing, verifyToken } from '../utils'

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[SESSION_COOKIES.authToken]
    const payload = verifyToken(token)
    if (payload) {
        const walletAddress = payload.walletAddress
        res.locals.walletAddress = getAddress(walletAddress)
        if (isExpComing(payload)) setSession(res, walletAddress)
    }

    next()
}
