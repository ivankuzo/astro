import NiceModal from '@ebay/nice-modal-react'
import { OnboardingModal } from './onboarding-modal'
import { Button } from '../../shared/ui/button'

export const OnboardingButton = () => {
    return (
        <Button
            variant='purple'
            className='aspect-square px-2 text-3xl'
            onClick={() => NiceModal.show(OnboardingModal)}
        >
            ?
        </Button>
    )
}
