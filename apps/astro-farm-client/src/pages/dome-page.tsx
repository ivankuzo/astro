import { UpgradesList } from '../features/dome/upgrades-list'
import { GameContentLayout } from '../layouts/content'

export const DomePage = () => {
    return (
        <div>
            <GameContentLayout>
                <div className='absolute bottom-[3%] w-full px-8'>
                    <UpgradesList />
                </div>
            </GameContentLayout>
        </div>
    )
}
