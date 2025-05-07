import { BOOSTS, getBoostId } from '@astro/astro-farm-game-core'
import { BoostCard } from '../../shared/components/boost-card'
import { IGCButton } from '../../shared/components/igc-button'
import NiceModal from '@ebay/nice-modal-react'
import { BuyBoostModal } from './buy-boost-modal'

export const BoostsTab = () => {
    //const boostTypes = Object.keys(BOOSTS) as BoostType[]

    return (
        <div className='space-y-4 px-4'>
            {BOOSTS.map(boost => {
                const boostId = getBoostId(boost)
                return (
                    <BoostCard key={boostId} boost={boost}>
                        <IGCButton
                            value={boost.price}
                            onClick={() => NiceModal.show(BuyBoostModal, { boost })}
                        />
                    </BoostCard>
                )
            })}
        </div>
    )
}
