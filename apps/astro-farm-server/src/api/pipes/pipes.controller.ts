import { Request, Response } from 'express'

import * as UseCase from '../../use-case'
import {
    GameResponse,
    GetPipesGameResponse,
    SubmitPipesGameResultRequest,
} from '@astro/astro-farm-api-contracts'

export const getPipesGame = async (req: Request, res: Response<GetPipesGameResponse>) => {
    const level = await UseCase.findCurrentPipesGame(res.locals.walletAddress)

    res.send(level)
}

export const submitPipesGameResult = async (
    req: Request<object, object, SubmitPipesGameResultRequest['body']>,
    res: Response<GameResponse>
) => {
    const game = await UseCase.submitPipesGameResult(res.locals.walletAddress, req.body.solution)

    res.send({ ...game.toObject() })
}
