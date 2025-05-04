import { WithClassName } from '@astro/client-cn'
import { cn } from '@astro/client-cn'
import { Typography, Image } from '../../shared/ui'
import { getUpgradedSeed, Seed, SeedId } from '@astro/astro-farm-game-core'
import { useGame } from '../../shared/hooks'

interface PlantStatItemProps extends WithClassName {
    imagePath: string
    value: string | number
}

const PlantStatItem = ({ imagePath, value, className }: PlantStatItemProps) => {
    return (
        <div className={cn('flex flex-col items-center', className)}>
            <Image path={imagePath} className='h-6 w-auto' />
            <Typography className='mt-1 text-center text-[11px] font-bold'>{value}</Typography>
        </div>
    )
}

export const PlantStasLists = ({ seedId }: { seedId: SeedId }) => {
    const { data: game } = useGame()
    if (!game) return null
    const seed = getUpgradedSeed(seedId, game)
    return (
        <div className='flex flex-row gap-3'>
            <PlantStatItem imagePath='plant-card/energy.png' value={-seed.plantEnergy} />
            <PlantStatItem imagePath='plant-card/xp.png' value={seed.xpGain} />

            <PlantStatItem imagePath='plant-card/igc.png' value={seed.igcYield} />

            <PlantStatItem imagePath='plant-card/recovery.png' value={seed.recoveryRate * 100} />
        </div>
    )
}
