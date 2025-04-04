import { DomeUpgradeType } from '@astro/astro-farm-game-core'
import { UpgradeCard } from './upgrade-card'

export const UpgradesList = () => {
    const upgradeTypes = Object.values(DomeUpgradeType)

    return (
        <div className='flex gap-4 overflow-x-auto'>
            {upgradeTypes.map(upgradeType => (
                <div key={upgradeType} className='flex-shrink-0'>
                    <UpgradeCard upgradeType={upgradeType} />
                </div>
            ))}
        </div>
    )
}
