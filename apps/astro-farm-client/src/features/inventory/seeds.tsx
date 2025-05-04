import { SeedId, SeedInventory } from '@astro/astro-farm-game-core'
import { PlantCard } from '../../shared/components/plant-card'

import { useGame } from '../../shared/hooks/use-game'
import { Typography } from '../../shared/ui'

export const InventorySeeds = () => {
    const { data: game } = useGame()
    const seedInventory = game?.seedInventory || ({} as SeedInventory)

    const availableSeeds = Object.keys(seedInventory)
        .filter(seedId => seedInventory[seedId as SeedId] > 0)
        .map(seedId => seedId as SeedId)

    if (availableSeeds.length === 0)
        return (
            <div className='mt-4 text-center'>
                <Typography textStroke='black'>No seeds available</Typography>
            </div>
        )

    return (
        <div className='grid grid-cols-3 gap-2'>
            {availableSeeds.map(seedId => (
                <PlantCard key={seedId} seedId={seedId} />
            ))}
        </div>
    )
}
