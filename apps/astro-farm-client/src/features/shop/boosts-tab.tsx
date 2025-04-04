import { BOOSTS, BoostType } from '@astro/astro-farm-game-core'
import { BoostCard } from '../../shared/components/boost-card'
import { IGCButton } from '../../shared/components/igc-button'
import NiceModal from '@ebay/nice-modal-react'
import { BuyBoostModal } from './buy-boost-modal'

export const BoostsTab = () => {
    const boostTypes = Object.keys(BOOSTS) as BoostType[]

    return (
        <div className='space-y-4'>
            {boostTypes.map(boostType => (
                <BoostCard key={boostType} boostType={boostType}>
                    <IGCButton
                        value={BOOSTS[boostType].price}
                        onClick={() => NiceModal.show(BuyBoostModal, { boostType })}
                    />
                </BoostCard>
            ))}
        </div>
    )
}
