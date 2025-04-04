import { SignInButton } from './sign-in-button'
import { WalletBadge } from './wallet-badge'

export const SignIn = () => {
    return (
        <div className='flex flex-col gap-4'>
            <WalletBadge />
            <SignInButton />
        </div>
    )
}
