import { useEffect, useState } from 'react'
import { ModalWithImage } from '../../shared/components/modals'
import { Typography } from '../../shared/ui/typography'
import { RangeSlider } from '../../shared/components/range-slider'
import NiceModal from '@ebay/nice-modal-react'
import { IGCButton } from '../../shared/components/igc-button'
import { getSeed, SeedId } from '@astro/astro-farm-game-core'
import { useBuySeeds } from '../../shared/hooks'

interface BuySeedModalProps {
    seedId: SeedId
}

export const BuySeedModal = NiceModal.create(({ seedId }: BuySeedModalProps) => {
    const [quantity, setQuantity] = useState(1)
    const seed = getSeed(seedId)
    const buySeedsMutation = useBuySeeds()

    useEffect(() => {
        setQuantity(1)
    }, [seedId])

    const handle = async () => {
        await buySeedsMutation.mutateAsync({
            body: {
                seedId,
                amount: quantity,
            },
        })
        NiceModal.hide(BuySeedModal)
    }

    return (
        <ModalWithImage
            title='PURCHASE CONFIRMATION'
            imagePath={`plants/${seed.type}/icons/${seed.type}_${seed.level}.png`}
            button={
                <IGCButton
                    value={quantity * seed.price}
                    onClick={handle}
                    disabled={buySeedsMutation.isPending}
                />
            }
        >
            <div>
                <Typography variant='h1' textStroke='#8003BE' className='mb-1 text-center text-xl'>
                    {seed.name}
                </Typography>
                <RangeSlider value={quantity} onChange={setQuantity} />
            </div>
        </ModalWithImage>
    )
})
