import { NextFunction, Request, Response } from 'express'

import { AppError } from '@astro/server/errors'

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.walletAddress) throw new AppError('You are not authorized', 401)
    next()
}
