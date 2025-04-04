import { SignOut } from '../features/auth/sign-out'
import { GameContentLayout } from '../layouts/content/game-content-layout'

export const WalletPage = () => {
    return (
        <GameContentLayout className='flex flex-col items-center justify-center'>
            <SignOut />
        </GameContentLayout>
    )
}
