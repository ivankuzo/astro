import NiceModal from '@ebay/nice-modal-react'
import { Button } from '../../shared/ui/button'
import { Image } from '../../shared/ui/image'
import { InventoryModal } from './inventory-modal'

export const InventoryButton = () => {
    return (
        <Button
            variant='purple'
            className='aspect-square px-2'
            onClick={() => NiceModal.show(InventoryModal)}
        >
            <Image path='nav/inventory.png' className='w-full' />
        </Button>
    )
}
