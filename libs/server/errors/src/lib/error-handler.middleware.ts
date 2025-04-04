import { NextFunction, Request, Response } from 'express'

import { ZodError } from 'zod'

import { logger } from '@astro/server/logger'

import { AppError } from './app-error'

export const errorHandler = (
    e: Error | ZodError | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.debug(e)

    if (e instanceof ZodError) {
        res.status(400).send({ message: e.errors[0].message })
        return
    }

    if (e instanceof AppError) {
        const responsePayload: { message: string; errorCode?: number } = {
            message: e.message,
        }

        if (e.errorCode) {
            responsePayload.errorCode = e.errorCode
        }

        const statusCode = e.statusCode || 400

        res.status(statusCode).send(responsePayload)
        return
    } else {
        res.status(500).send({ message: e.message })
        return
    }
}
