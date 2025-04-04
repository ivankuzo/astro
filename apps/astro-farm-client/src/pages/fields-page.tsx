import { Fields } from '../features/fields/fields'
import { EnergyProgressBar } from '../features/energy/energy-progress-bar'
import { GameContentLayout } from '../layouts/content/game-content-layout'
import { InventoryButton } from '../features/inventory'
export const FieldsPage = () => {
    return (
        <div className=''>
            <GameContentLayout>
                <div className='absolute bottom-[24%] flex w-full justify-center px-2'>
                    <div className='w-full max-w-md'>
                        <Fields />
                    </div>
                </div>
                <div className='absolute bottom-0 flex w-full flex-col items-end space-y-3 px-8 pb-4'>
                    <InventoryButton />
                    <EnergyProgressBar />
                </div>
            </GameContentLayout>
        </div>
    )
}
