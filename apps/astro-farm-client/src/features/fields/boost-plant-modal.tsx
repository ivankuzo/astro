import NiceModal from '@ebay/nice-modal-react'
import { BoostsByEffect, FieldNumber } from '@astro/astro-farm-game-core'
import { BOOSTS, BoostType } from '@astro/astro-farm-game-core'
import { BoostCard } from '../../shared/components/boost-card'
import { Modal } from '../../shared/components/modals'
import { Button } from '../../shared/ui/button'

import { useGrowthTimeReduction } from '../../shared/hooks'

const BoostCardChoose = ({
    boostType,
    fieldNumber,
}: {
    boostType: BoostsByEffect<'growthTimeReduction'>
    fieldNumber: FieldNumber
}) => {
    const boostMutation = useGrowthTimeReduction()

    const handle = async () => {
        await boostMutation.mutateAsync({
            body: {
                fieldNumber,
                boostType,
            },
        })
        NiceModal.hide(BoostPlantModal)
    }

    return (
        <BoostCard boostType={boostType}>
            <Button variant='orange' onClick={handle} disabled={boostMutation.isPending}>
                Choose
            </Button>
        </BoostCard>
    )
}
export const BoostPlantModal = NiceModal.create(({ fieldNumber }: { fieldNumber: FieldNumber }) => {
    const growthTimeReductionBoosts = Object.keys(BOOSTS).filter(
        boostType => BOOSTS[boostType as BoostType].effect.type === 'growthTimeReduction'
    ) as BoostsByEffect<'growthTimeReduction'>[]

    return (
        <Modal title='CHOOSE A BOOST'>
            <div className='space-y-4'>
                {growthTimeReductionBoosts.map(boostType => (
                    <BoostCardChoose
                        key={boostType}
                        boostType={boostType}
                        fieldNumber={fieldNumber}
                    />
                ))}
            </div>
        </Modal>
    )
})
