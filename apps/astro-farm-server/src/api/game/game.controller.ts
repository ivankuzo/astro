import { Request, Response } from 'express'

import {
    BuyBoostsRequest,
    BuySeedsRequest,
    GameResponse,
    HarvestRequest,
    PlantRequest,
    UpgradeDomeRequest,
    EnergyBoostRequest,
    GrowthTimeBoostRequest,
} from '@astro/astro-farm-api-contracts'

import * as UseCase from '../../use-case'

export const getGame = async (req: Request, res: Response<GameResponse>) => {
    const game = await UseCase.getGame(res.locals.walletAddress)

    res.send({ ...game.toObject() })
}

export const plant = async (
    req: Request<object, object, PlantRequest['body']>,
    res: Response<GameResponse>
) => {
    const game = await UseCase.plant(
        res.locals.walletAddress,
        req.body.fieldNumber,
        req.body.seedId
    )

    res.send({ ...game.toObject() })
}

export const harvest = async (
    req: Request<object, object, HarvestRequest['body']>,
    res: Response<GameResponse>
) => {
    const game = await UseCase.harvest(res.locals.walletAddress, req.body.fieldNumber)

    res.send({ ...game.toObject() })
}

export const buySeeds = async (
    req: Request<object, object, BuySeedsRequest['body']>,
    res: Response<GameResponse>
) => {
    const game = await UseCase.buySeeds(res.locals.walletAddress, req.body.seedId, req.body.amount)

    res.send({ ...game.toObject() })
}

export const buyBoosts = async (
    req: Request<object, object, BuyBoostsRequest['body']>,
    res: Response<GameResponse>
) => {
    const game = await UseCase.buyBoosts(
        res.locals.walletAddress,
        req.body.boostId,
        req.body.amount
    )

    res.send({ ...game.toObject() })
}

export const upgradeDome = async (
    req: Request<object, object, UpgradeDomeRequest['body']>,
    res: Response<GameResponse>
) => {
    const game = await UseCase.upgradeDome(res.locals.walletAddress, req.body.type)

    res.send({ ...game.toObject() })
}

export const useGrowthTimeBoost = async (
    req: Request<object, object, GrowthTimeBoostRequest['body']>,
    res: Response<GameResponse>
) => {
    const game = await UseCase.useGrowthTimeBoost(
        res.locals.walletAddress,
        req.body.fieldNumber,
        req.body.boostId
    )
    res.send({ ...game.toObject() })
}

export const useEnergyBoost = async (
    req: Request<object, object, EnergyBoostRequest['body']>,
    res: Response<GameResponse>
) => {
    const game = await UseCase.useEnergyBoost(res.locals.walletAddress, req.body.boostId)

    res.send({ ...game.toObject() })
}
