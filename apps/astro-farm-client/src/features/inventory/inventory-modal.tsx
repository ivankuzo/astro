import NiceModal from '@ebay/nice-modal-react'
import { ModalTabs } from '../../shared/components/modals'
import { InventoryBoosts } from './boosts'
import { InventorySeeds } from './seeds'

export const InventoryModal = NiceModal.create(() => {
    const tabs = [
        {
            id: 'boosts',
            label: 'Boosts',
            content: <InventoryBoosts />,
        },
        {
            id: 'seeds',
            label: 'Seeds',
            content: <InventorySeeds />,
        },
    ]

    return <ModalTabs title='INVENTORY' tabs={tabs} className='h-[40vh] sm:h-[400px]' />
})
