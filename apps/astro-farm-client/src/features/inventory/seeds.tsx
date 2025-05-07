import { SeedId, SeedInventory } from '@astro/astro-farm-game-core'
import { PlantCard } from '../../shared/components/plant-card'

import { useGame } from '../../shared/hooks/use-game'
import { Button, Typography } from '../../shared/ui'
import { NavLink } from 'react-router-dom'
import NiceModal from '@ebay/nice-modal-react'

export const InventorySeeds = () => {
    const modal = NiceModal.useModal()
    const { data: game } = useGame()
    const seedInventory = game?.seedInventory || ({} as SeedInventory)

    const availableSeeds = Object.keys(seedInventory)
        .filter(seedId => seedInventory[seedId as SeedId] > 0)
        .map(seedId => seedId as SeedId)

    if (availableSeeds.length === 0)
        return (
            <div className='mt-8 flex flex-col items-center space-y-2'>
                <Typography textStroke='black'>No seeds available</Typography>
                <NavLink to='/shop/seeds' onClick={() => modal.remove()}>
                    <Button variant='blue'>Go To Shop</Button>
                </NavLink>
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
