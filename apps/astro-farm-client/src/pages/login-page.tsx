import { useAuthStatus } from '@astro/session-client'
import { useAccount } from 'wagmi'
import { ConnectWalletButton } from '../features/auth/connect-wallet-button'
import { SignIn } from '../features/auth/sign-in'
import { ContentLayout } from '../layouts/content/content-layout'
export const LoginPage = () => {
    const { address } = useAccount()
    const authStatus = useAuthStatus()

    return (
        <ContentLayout className='flex flex-col items-center justify-center'>
            {!address && <ConnectWalletButton />}
            {address && !authStatus && <SignIn />}
        </ContentLayout>
    )
}
