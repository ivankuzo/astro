import { DomeUpgradeType } from '@astro/astro-farm-game-core'
import { Podium } from './podium'

export const PodiumList = () => {
    const upgradeTypes = Object.values(DomeUpgradeType).filter(
        upgradeType => upgradeType !== DomeUpgradeType.totalUnlockedFields
    )
    return (
        <div className='grid w-full grid-cols-2 justify-center gap-4 sm:grid-cols-4'>
            {upgradeTypes.map(upgradeType => (
                <Podium key={upgradeType} upgradeType={upgradeType} />
            ))}
        </div>
    )
}
