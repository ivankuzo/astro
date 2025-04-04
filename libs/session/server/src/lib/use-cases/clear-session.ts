import { Response } from 'express'

import { SESSION_COOKIES } from '@astro/session-api-contracts'

export const clearSession = (res: Response) =>
    res.clearCookie(SESSION_COOKIES.authToken).clearCookie(SESSION_COOKIES.userWallet)
