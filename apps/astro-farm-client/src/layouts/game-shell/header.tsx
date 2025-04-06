import { useGame } from '../../shared/hooks'
import { ProgressBar } from '../../shared/components/progress-bar'
import { XpProgressBar } from '../../features/xp/xp-progress-bar'

const Igc = () => {
    const { data: game } = useGame()
    return <ProgressBar text={Math.floor(game?.igc || 0).toString()} imagePath='igc.png' />
}

export const Header = () => {
    return (
        <header className='flex h-20 w-full items-center justify-between space-x-5 px-5'>
            <XpProgressBar />
            <Igc />
        </header>
    )
}
