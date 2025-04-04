import NiceModal from '@ebay/nice-modal-react'
import { ModalTabs } from '../../shared/components/modals'
import { InventoryBoosts } from './inventory-boosts'
import { InventorySeeds } from './inventory-seeds'

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

    return <ModalTabs title='INVENTORY' tabs={tabs} />
})
