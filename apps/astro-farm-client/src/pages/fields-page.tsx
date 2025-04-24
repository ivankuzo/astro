import { Fields } from '../features/fields/fields'
import { EnergyProgressBar } from '../features/energy/energy-progress-bar'
import { GameContentLayout } from '../layouts/content/game-content-layout'
import { InventoryButton } from '../features/inventory'
import { IslandIcon } from '../assets/svg'

export const FieldsPage = () => {
    return (
        <div className=''>
            <GameContentLayout className='bottom-12 overflow-y-hidden'>
                <div className='flex w-full items-center justify-center'>
                    <div className='absolute bottom-[10%] w-full sm:bottom-[20%] sm:w-[400px]'>
                        <div className='relative w-full'>
                            <IslandIcon className='scale-[1.8] sm:scale-[1]' />
                            <div className='absolute -top-[25%] left-1/2 w-full -translate-x-1/2 px-2 sm:-top-[2%] sm:w-9/12'>
                                <Fields />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-8 flex w-full flex-col items-end space-y-3 px-8'>
                    <InventoryButton />
                    <EnergyProgressBar />
                </div>
            </GameContentLayout>
        </div>
    )
}
