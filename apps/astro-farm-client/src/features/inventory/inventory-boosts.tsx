import { BoostType, BoostInventory, BoostsByEffect, BOOSTS } from '@astro/astro-farm-game-core'

import { BoostCard } from '../../shared/components/boost-card'

import { useGame } from '../../shared/hooks/use-game'
import { useEnergyRestoreBoost } from '../../shared/hooks'
import { Button } from '../../shared/ui/button'
import { InventoryModal } from './inventory-modal'
import NiceModal from '@ebay/nice-modal-react'

const InventoryEnergyBoostCard = ({
    boostType,
}: {
    boostType: BoostsByEffect<'energyRestore'>
}) => {
    const energyRestoreBoostMutation = useEnergyRestoreBoost()

    const handle = async () => {
        await energyRestoreBoostMutation.mutateAsync({
            body: {
                boostType,
            },
        })
        await NiceModal.hide(InventoryModal)
    }

    return (
        <BoostCard boostType={boostType}>
            <Button
                variant='orange'
                size='sm'
                onClick={handle}
                disabled={energyRestoreBoostMutation.isPending}
            >
                Apply
            </Button>
        </BoostCard>
    )
}

const InventoryGrowthTimeReductionBoostCard = ({
    boostType,
}: {
    boostType: BoostsByEffect<'growthTimeReduction'>
}) => {
    const handle = async () => {
        await NiceModal.hide(InventoryModal)
    }

    return (
        <BoostCard boostType={boostType}>
            <Button variant='orange' size='sm' onClick={handle}>
                Choose Field
            </Button>
        </BoostCard>
    )
}

export const InventoryBoosts = () => {
    const { data: game } = useGame()
    const boostInventory = game?.boostInventory || ({} as BoostInventory)

    const availableBoosts = Object.keys(boostInventory)
        .filter(boostType => boostInventory[boostType as BoostType] > 0)
        .map(boostType => boostType as BoostType)

    const growthTimeReductionBoosts = availableBoosts.filter(
        boostType => BOOSTS[boostType].effect.type === 'growthTimeReduction'
    ) as BoostsByEffect<'growthTimeReduction'>[]

    const energyRestoreBoosts = availableBoosts.filter(
        boostType => BOOSTS[boostType].effect.type === 'energyRestore'
    ) as BoostsByEffect<'energyRestore'>[]

    return (
        <div className='space-y-4'>
            {energyRestoreBoosts.map(boostType => (
                <InventoryEnergyBoostCard key={boostType} boostType={boostType} />
            ))}
            {growthTimeReductionBoosts.map(boostType => (
                <InventoryGrowthTimeReductionBoostCard key={boostType} boostType={boostType} />
            ))}
        </div>
    )
}
