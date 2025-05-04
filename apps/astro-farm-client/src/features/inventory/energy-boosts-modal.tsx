import NiceModal from '@ebay/nice-modal-react'
import { Modal } from '../../shared/components/modals'
import { BoostId } from '@astro/astro-farm-game-core'
import { useGame } from '../../shared/hooks'
import { InventoryEnergyBoostCard } from './boosts'
import { Typography } from '../../shared/ui'

export const EnergyBoostsModal = NiceModal.create(() => {
    const { data: game } = useGame()
    const boostInventory = game?.boostInventory
    if (!boostInventory) return null

    const energyBoostIds = Object.keys(boostInventory)
        .filter(boostId => boostInventory[boostId as BoostId] > 0)
        .filter(boostId => boostId.startsWith('energy_')) as BoostId<'energy'>[]

    return (
        <Modal title='ENERGY BOOSTS' className='h-[40vh] sm:h-[400px]'>
            {energyBoostIds.length > 0 ? (
                <div className='space-y-4'>
                    {energyBoostIds.map(boostId => (
                        <InventoryEnergyBoostCard key={boostId} boostId={boostId} />
                    ))}
                </div>
            ) : (
                <div className='mt-4 text-center'>
                    <Typography textStroke='black'>No energy boosts available</Typography>
                </div>
            )}
        </Modal>
    )
})
