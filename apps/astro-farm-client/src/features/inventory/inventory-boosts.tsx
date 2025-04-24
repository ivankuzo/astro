import { BoostInventory, BoostId, getBoost } from '@astro/astro-farm-game-core'

import { BoostCard } from '../../shared/components/boost-card'

import { useGame } from '../../shared/hooks/use-game'
import { useEnergyRestoreBoost } from '../../shared/hooks'
import { Button } from '../../shared/ui/button'
import { InventoryModal } from './inventory-modal'
import NiceModal from '@ebay/nice-modal-react'

const InventoryEnergyBoostCard = ({ boostId }: { boostId: BoostId<'energyRestore'> }) => {
    const energyRestoreBoostMutation = useEnergyRestoreBoost()

    const handle = async () => {
        await energyRestoreBoostMutation.mutateAsync({
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
                disabled={energyRestoreBoostMutation.isPending}
            >
                Apply
            </Button>
        </BoostCard>
    )
}

const InventoryGrowthTimeReductionBoostCard = ({
    boostId,
}: {
    boostId: BoostId<'growthTimeReduction'>
}) => {
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

    const growthTimeReductionBoostIds = availableBoostIds.filter(boostId =>
        boostId.startsWith('growthTimeReduction_')
    ) as BoostId<'growthTimeReduction'>[]

    const energyRestoreBoostIds = availableBoostIds.filter(boostId =>
        boostId.startsWith('energyRestore_')
    ) as BoostId<'energyRestore'>[]

    return (
        <div className='space-y-4'>
            {energyRestoreBoostIds.map(boostId => (
                <InventoryEnergyBoostCard key={boostId} boostId={boostId} />
            ))}
            {growthTimeReductionBoostIds.map(boostId => (
                <InventoryGrowthTimeReductionBoostCard key={boostId} boostId={boostId} />
            ))}
        </div>
    )
}
