import { DomeUpgradeType } from '@astro/astro-farm-game-core'
import { useGame } from '../../shared/hooks/use-game'
import { getPodiumImagePath } from './utils'
import { Image } from '../../shared/ui'
import { cn, WithClassName } from '@astro/client-cn'

type UpgradeItemProps = {
    upgradeType: DomeUpgradeType
} & WithClassName

export const UpgradeItem = ({ upgradeType, className }: UpgradeItemProps) => {
    const { data: game } = useGame()
    if (!game) return null
    // const level = game.dome[upgradeType]
    const level = 1
    const imagePath = getPodiumImagePath(upgradeType, level)

    return <Image path={imagePath} className={cn(className)} />
}

export const IgcItem = ({ className }: WithClassName) => {
    return <UpgradeItem upgradeType={DomeUpgradeType.igcYield} className={cn(className)} />
}

export const GrowthItem = ({ className }: WithClassName) => {
    return <UpgradeItem upgradeType={DomeUpgradeType.growthSpeed} className={cn(className)} />
}

export const XpItem = ({ className }: WithClassName) => {
    return <UpgradeItem upgradeType={DomeUpgradeType.xpGain} className={cn(className)} />
}

export const EnergyItem = ({ className }: WithClassName) => {
    return <UpgradeItem upgradeType={DomeUpgradeType.energyCapacity} className={cn(className)} />
}
