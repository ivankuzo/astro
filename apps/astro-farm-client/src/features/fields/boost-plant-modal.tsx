import NiceModal from '@ebay/nice-modal-react'
import { getBoost, BoostId, FieldNumber } from '@astro/astro-farm-game-core'

import { BoostCard } from '../../shared/components/boost-card'
import { Modal } from '../../shared/components/modals'
import { Button } from '../../shared/ui/button'

import { useGame, useGrowthTimeBoost } from '../../shared/hooks'
import { Typography } from '../../shared/ui'
const BoostCardChoose = ({
    boostId,
    fieldNumber,
}: {
    boostId: BoostId<'growthTime'>
    fieldNumber: FieldNumber
}) => {
    const boostMutation = useGrowthTimeBoost()

    const handle = async () => {
        await boostMutation.mutateAsync({
            body: {
                fieldNumber,
                boostId,
            },
        })
        NiceModal.hide(BoostPlantModal)
    }

    return (
        <BoostCard boost={getBoost(boostId)}>
            <Button variant='orange' onClick={handle} disabled={boostMutation.isPending}>
                Choose
            </Button>
        </BoostCard>
    )
}
export const BoostPlantModal = NiceModal.create(({ fieldNumber }: { fieldNumber: FieldNumber }) => {
    const { data: game } = useGame()
    const boostInventory = game?.boostInventory
    if (!boostInventory) return null

    const growthTimeBoostIds = Object.keys(boostInventory)
        .filter(boostId => boostInventory[boostId as BoostId] > 0)
        .filter(boostId => boostId.startsWith('growthTime_')) as BoostId<'growthTime'>[]
    return (
        <Modal title='CHOOSE A BOOST' className='h-[40vh] sm:h-[400px]'>
            {growthTimeBoostIds.length > 0 ? (
                <div className='space-y-4'>
                    {growthTimeBoostIds.map(boostId => (
                        <BoostCardChoose
                            key={boostId}
                            boostId={boostId}
                            fieldNumber={fieldNumber}
                        />
                    ))}
                </div>
            ) : (
                <div className='mt-4 text-center'>
                    <Typography textStroke='black'>No growth time boosts available</Typography>
                </div>
            )}
        </Modal>
    )
})
