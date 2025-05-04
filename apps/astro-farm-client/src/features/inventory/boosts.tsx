import { BoostInventory, BoostId, getBoost } from '@astro/astro-farm-game-core'

import { BoostCard } from '../../shared/components/boost-card'

import { useGame } from '../../shared/hooks/use-game'
import { useEnergyBoost } from '../../shared/hooks'
import { Button } from '../../shared/ui/button'
import { InventoryModal } from './inventory-modal'
import NiceModal from '@ebay/nice-modal-react'
import { Typography } from '../../shared/ui'

export const InventoryEnergyBoostCard = ({ boostId }: { boostId: BoostId<'energy'> }) => {
    const energyBoostMutation = useEnergyBoost()

    const handle = async () => {
        await energyBoostMutation.mutateAsync({
            body: {
                boostId,
            },
        })
        await NiceModal.hide(InventoryModal)
    }

    return (
        <BoostCard boost={getBoost(boostId)}>
            <Button
                variant='orange'
                size='sm'
                onClick={handle}
                disabled={energyBoostMutation.isPending}
            >
                Apply
            </Button>
        </BoostCard>
    )
}

export const InventoryGrowthTimeBoostCard = ({ boostId }: { boostId: BoostId<'growthTime'> }) => {
    const handle = async () => {
        await NiceModal.hide(InventoryModal)
    }

    return (
        <BoostCard boost={getBoost(boostId)}>
            <Button variant='orange' size='sm' onClick={handle}>
                Choose Field
            </Button>
        </BoostCard>
    )
}

export const InventoryBoosts = () => {
    const { data: game } = useGame()
    const boostInventory = game?.boostInventory
    if (!boostInventory) return null

    const availableBoostIds = Object.keys(boostInventory).filter(
        boostId => boostInventory[boostId as BoostId] > 0
    )

    const growthTimeBoostIds = availableBoostIds.filter(boostId =>
        boostId.startsWith('growthTime_')
    ) as BoostId<'growthTime'>[]

    const energyBoostIds = availableBoostIds.filter(boostId =>
        boostId.startsWith('energy_')
    ) as BoostId<'energy'>[]

    if (energyBoostIds.length === 0 && growthTimeBoostIds.length === 0)
        return (
            <div className='mt-4 text-center'>
                <Typography textStroke='black'>No boosts available</Typography>
            </div>
        )

    return (
        <div className='space-y-4'>
            {energyBoostIds.map(boostId => (
                <InventoryEnergyBoostCard key={boostId} boostId={boostId} />
            ))}
            {growthTimeBoostIds.map(boostId => (
                <InventoryGrowthTimeBoostCard key={boostId} boostId={boostId} />
            ))}
        </div>
    )
}
