import { DomeUpgradeType, getUpgradeCost } from '@astro/astro-farm-game-core'

import { createGameService, findGameByWalletAddress } from '../../models/game'

export const upgradeDome = async (walletAddress: string, type: DomeUpgradeType) => {
    const game = await findGameByWalletAddress(walletAddress)
    const gameService = createGameService(game)

    const cost = getUpgradeCost(game.dome, type)
    if (cost === null) {
        throw new Error(`Cannot upgrade ${type}`)
    }

    const upgradeHandlers = {
        [DomeUpgradeType.totalUnlockedFields]: gameService.upgradeTotalUnlockedFields,
        [DomeUpgradeType.energyCapacity]: gameService.upgradeEnergyCapacityLevel,
        [DomeUpgradeType.xpGain]: gameService.upgradeXpGainLevel,
        [DomeUpgradeType.growthSpeed]: gameService.upgradeGrowthSpeedLevel,
        [DomeUpgradeType.igcYield]: gameService.upgradeIgcYieldLevel,
    }

    upgradeHandlers[type]()
    gameService.subIgc(cost)

    await game.save()
    return game
}
