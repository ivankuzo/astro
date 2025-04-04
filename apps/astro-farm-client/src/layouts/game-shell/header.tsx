import { useGame } from '../../shared/hooks'
import { Typography } from '../../shared/ui'
import { ProgressBar } from '../../shared/components/progress-bar'
import {
    getLevelByXp,
    getNextLevelThreshold,
    getPreviousLevelThreshold,
} from '@astro/astro-farm-game-core'

const Xp = () => {
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
            />
            <div className='absolute left-0 top-0 z-20 flex h-6 w-6 items-center justify-center pr-1'>
                <Typography className='text-xs font-bold'>{getLevelByXp(game.xp)}</Typography>
            </div>
        </div>
    )
}

const Igc = () => {
    const { data: game } = useGame()
    return <ProgressBar text={Math.floor(game?.igc || 0).toString()} imagePath='igc.png' />
}

export const Header = () => {
    return (
        <header className='flex h-20 w-full items-center justify-between space-x-5 px-5'>
            <Xp />
            <Igc />
        </header>
    )
}
