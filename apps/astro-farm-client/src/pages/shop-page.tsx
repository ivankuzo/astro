import { GameContentLayout } from '../layouts/content/game-content-layout'
import { ShopNavigation } from '../features/shop'

export const ShopPage = () => {
    return (
        <GameContentLayout className='pb-0'>
            <ShopNavigation />
        </GameContentLayout>
    )
}
