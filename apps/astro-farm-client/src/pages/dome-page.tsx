import { PodiumList } from '../features/dome/podium-list'
import { UpgradesList } from '../features/dome/upgrades-list'
import { GameContentLayout } from '../layouts/content'

export const DomePage = () => {
    return (
        <div>
            <GameContentLayout className='px-0'>
                <div className='absolute bottom-[3%] w-full'>
                    <div className='mb-10 flex w-full items-center justify-center'>
                        <div className='w-3/5 max-w-[600px]'>
                            <PodiumList />
                        </div>
                    </div>

                    <div className='px-8'>
                        <UpgradesList />
                    </div>
                </div>
            </GameContentLayout>
        </div>
    )
}
