import { getLevelByXp } from '@astro/astro-farm-game-core'

import { getNextLevelThreshold } from '@astro/astro-farm-game-core'

import { getPreviousLevelThreshold } from '@astro/astro-farm-game-core'
import { useGame } from '../../shared/hooks'
import { ProgressBar } from '../../shared/components/progress-bar'
import { Typography } from '../../shared/ui'

export const XpProgressBar = () => {
    const { data: game } = useGame()

    if (!game) return null

    const currentXp = game.xp
    const previousLevelThreshold = getPreviousLevelThreshold(currentXp)
    const nextLevelThreshold = getNextLevelThreshold(currentXp)
    const levelProgress = currentXp - previousLevelThreshold
    const levelTotalXp = nextLevelThreshold - previousLevelThreshold

    return (
        <div className='relative w-full'>
            <ProgressBar
                value={levelProgress}
                maxValue={levelTotalXp}
                variant='purple'
                imagePath='xp.png'
                showValue
            />
            <div className='absolute left-0 top-0 z-20 flex h-6 w-6 items-center justify-center pr-1'>
                <Typography className='' textStroke='black'>
                    {getLevelByXp(game.xp)}
                </Typography>
            </div>
        </div>
    )
}
