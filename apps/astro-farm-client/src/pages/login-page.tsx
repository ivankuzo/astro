import { useAuthStatus } from '@astro/session-client'
import { useAccount } from 'wagmi'
import { ConnectWalletButton } from '../features/auth/connect-wallet-button'
import { WalletBadge } from '../features/auth/wallet-badge'
import { SignInButton } from '../features/auth/sign-in-button'
import { DownloadAuroraPassButton } from '../features/auth/download-aurora-pass-button'

export const LoginPage = () => {
    const { address } = useAccount()
    const authStatus = useAuthStatus()

    return (
        <div className='flex h-screen flex-col items-center justify-center bg-[#4B009A] px-4'>
            <div className='w-full max-w-md'>
                {!address && (
                    <>
                        <ConnectWalletButton />
                        <div className='mt-4'>
                            <DownloadAuroraPassButton />
                        </div>
                    </>
                )}
                {address && !authStatus && (
                    <>
                        <WalletBadge />
                        <div className='mt-4'>
                            <SignInButton />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
