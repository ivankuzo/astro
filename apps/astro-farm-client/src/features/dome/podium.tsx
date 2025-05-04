import { DomeUpgradeType } from '@astro/astro-farm-game-core'
import { PodiumSVG } from '../../assets/svg'
import { Typography, Image } from '../../shared/ui'
import { getPodiumImagePath, getPodiumTitle } from './utils'
import { useGame } from '../../shared/hooks/use-game'

type PodiumProps = {
    upgradeType: DomeUpgradeType
}

export const Podium = ({ upgradeType }: PodiumProps) => {
    const { data: game } = useGame()
    if (!game) return null
    const level = game.dome[upgradeType]
    const title = getPodiumTitle(upgradeType)
    const imagePath = getPodiumImagePath(upgradeType, level)
    return (
        <div className='relative flex items-center justify-center'>
            <PodiumSVG />
            <Typography className='absolute bottom-[5%] left-1/2 -translate-x-1/2 text-xs font-bold'>
                {title}
            </Typography>
            <Image
                path={imagePath}
                className='absolute bottom-[10%] left-1/2 w-2/3 -translate-x-1/2'
            />
        </div>
    )
}
