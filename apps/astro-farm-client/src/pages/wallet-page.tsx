import { GameContentLayout } from '../layouts/content/game-content-layout'
import { WalletBadge } from '../features/auth/wallet-badge'
import { SignOutButton } from '../features/auth/sign-out-button'

export const WalletPage = () => {
    return (
        <GameContentLayout className='mt-10 flex w-full flex-col items-center px-4'>
            <WalletBadge />
            <div className='mt-4'>
                <SignOutButton />
            </div>
        </GameContentLayout>
    )
}
