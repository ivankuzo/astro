import { useEffect } from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { OnboardingModal } from './onboarding-modal'

const KEY = 'onboarding'

export const useOnboarding = () => {
    useEffect(() => {
        const hasCompletedOnboarding = localStorage.getItem(KEY) === 'true'

        if (!hasCompletedOnboarding) {
            localStorage.setItem(KEY, 'true')
            NiceModal.show(OnboardingModal)
        }
    }, [])
}
