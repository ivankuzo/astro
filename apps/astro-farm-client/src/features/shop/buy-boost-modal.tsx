import { useEffect, useState } from 'react'
import { ModalWithImage } from '../../shared/components/modals'
import { Typography } from '../../shared/ui/typography'
import { RangeSlider } from '../../shared/components/range-slider'
import NiceModal from '@ebay/nice-modal-react'
import { IGCButton } from '../../shared/components/igc-button'
import { Boost, getBoostId } from '@astro/astro-farm-game-core'
import { useBuyBoosts } from '../../shared/hooks'

interface BuyBoostModalProps {
    boost: Boost
}

export const BuyBoostModal = NiceModal.create(({ boost }: BuyBoostModalProps) => {
    const [quantity, setQuantity] = useState(1)
    const boostId = getBoostId(boost)
    const buyBoostMutation = useBuyBoosts()

    useEffect(() => {
        setQuantity(1)
    }, [boost])

    const handle = async () => {
        await buyBoostMutation.mutateAsync({
            body: {
                boostId,
                amount: quantity,
            },
        })
        NiceModal.hide(BuyBoostModal)
    }

    return (
        <ModalWithImage
            title='PURCHASE CONFIRMATION'
            imagePath={`boosts/${boostId}.png`}
            button={
                <IGCButton
                    value={quantity * boost.price}
                    onClick={handle}
                    disabled={buyBoostMutation.isPending}
                />
            }
        >
            <div>
                <Typography variant='h1' textStroke='#8003BE' className='mb-1 text-center text-xl'>
                    {boost.name}
                </Typography>
                <RangeSlider value={quantity} onChange={setQuantity} />
            </div>
        </ModalWithImage>
    )
})
