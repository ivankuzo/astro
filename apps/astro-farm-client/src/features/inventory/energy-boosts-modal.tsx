import NiceModal from '@ebay/nice-modal-react'
import { Modal } from '../../shared/components/modals'
import { BoostId } from '@astro/astro-farm-game-core'
import { useGame } from '../../shared/hooks'
import { InventoryEnergyBoostCard } from './boosts'
import { Button, Typography } from '../../shared/ui'
import { NavLink } from 'react-router-dom'

export const EnergyBoostsModal = NiceModal.create(() => {
    const modal = NiceModal.useModal()
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
                <div className='mt-8 flex flex-col items-center space-y-2'>
                    <Typography textStroke='black'>No energy boosts available</Typography>
                    <NavLink to='/shop/boosts' onClick={() => modal.remove()}>
                        <Button variant='blue'>Go To Shop</Button>
                    </NavLink>
                </div>
            )}
        </Modal>
    )
})
