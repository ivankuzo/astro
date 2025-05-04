import { Fields } from '../features/fields/fields'
import { EnergyProgressBar } from '../features/energy/energy-progress-bar'
import { GameContentLayout } from '../layouts/content/game-content-layout'
import { InventoryButton } from '../features/inventory'
import { IslandSVG } from '../assets/svg'
import { cn } from '@astro/client-cn'

import { IgcItem, GrowthItem, XpItem, EnergyItem } from '../features/dome/upgrade-items'

export const FieldsPage = () => {
    return (
        <div>
            <GameContentLayout className={cn('bottom-12', 'overflow-y-hidden')}>
                <div className={cn('flex w-full', 'items-center justify-center')}>
                    <div
                        className={cn(
                            'absolute w-full',
                            '-bottom-[6%] sm:bottom-[20%]',
                            'sm:w-[400px]'
                        )}
                    >
                        <div className='relative w-full'>
                            <IslandSVG
                                className={cn(
                                    'relative left-1/2 w-[180vw] -translate-x-1/2',
                                    'sm:w-full'
                                )}
                            />
                            <div
                                className={cn(
                                    'absolute w-full',
                                    'top-[10%] sm:top-[4%]',
                                    'left-1/2 -translate-x-1/2',
                                    'z-10 px-2',
                                    'sm:w-8/12'
                                )}
                            >
                                <Fields />
                            </div>
                            <EnergyItem
                                className={cn(
                                    'absolute w-[17%] sm:w-[10%]',
                                    'top-[2%] sm:top-[8%]',
                                    'left-[6%] sm:left-[12%]'
                                )}
                            />
                            <XpItem
                                className={cn(
                                    'absolute w-[17%] sm:w-[10%]',
                                    'top-[1%] sm:-top-[4%]',
                                    'left-[42%] sm:left-[45%]'
                                )}
                            />
                            <GrowthItem
                                className={cn(
                                    'absolute w-[17%] sm:w-[10%]',
                                    '-top-[2%] sm:top-[0%]',
                                    'left-[60%] sm:left-[70%]'
                                )}
                            />
                            <IgcItem
                                className={cn(
                                    'absolute w-[17%] sm:w-[10%]',
                                    'top-[3%] sm:top-[20%]',
                                    'left-[80%] sm:left-[85%]'
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={cn(
                        'absolute bottom-8 w-full',
                        'flex flex-col items-end',
                        'space-y-3 px-8'
                    )}
                >
                    <InventoryButton />
                    <EnergyProgressBar />
                </div>
            </GameContentLayout>
        </div>
    )
}
