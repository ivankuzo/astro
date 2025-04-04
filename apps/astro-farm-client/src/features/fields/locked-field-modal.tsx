import NiceModal from '@ebay/nice-modal-react'
import { Modal } from '../../shared/components/modals/modal'
import { Button } from '../../shared/ui/button'
import { Typography } from '../../shared/ui/typography'
import { useNavigate } from 'react-router-dom'
import { DomeUpgradeType } from '@astro/astro-farm-game-core'

export const LockedFieldModal = NiceModal.create(() => {
    const navigate = useNavigate()

    const handleGoToDome = () => {
        NiceModal.hide(LockedFieldModal)
        navigate(`/dome?highlight=${DomeUpgradeType.totalUnlockedFields}`)
    }

    return (
        <Modal
            title='LOCKED FIELD'
            button={
                <Button variant='blue' onClick={handleGoToDome}>
                    Go to Dome
                </Button>
            }
        >
            <Typography variant='p'>
                This field is locked. You can unlock new fields in Dome.
            </Typography>
        </Modal>
    )
})
