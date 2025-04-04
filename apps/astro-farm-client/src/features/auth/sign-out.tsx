import { SignOutButton } from './sign-out-button'
import { WalletBadge } from './wallet-badge'

export const SignOut = () => (
    <div className='flex flex-col gap-4'>
        <WalletBadge />
        <SignOutButton />
    </div>
)
