import { useState } from 'react'
import { Button } from '../../shared/ui'
import { BoostsTab } from './boosts-tab'
import { SeedsTab } from './seeds-tab'

export const ShopNavigation = () => {
    const [activeTab, setActiveTab] = useState<'boosts' | 'seeds'>('seeds')

    return (
        <div className='relative flex h-full flex-col'>
            <div className='mx-auto max-w-md flex-1  overflow-auto px-4 pb-24'>
                {activeTab === 'boosts' && <BoostsTab />}
                {activeTab === 'seeds' && <SeedsTab />}
            </div>
            <div className='absolute bottom-0 left-0 right-0 z-30 grid grid-cols-2 gap-2 bg-[#4B009A] px-4 py-4'>
                <Button
                    variant='purple'
                    onClick={() => setActiveTab('seeds')}
                    disabled={activeTab === 'seeds'}
                >
                    Seeds
                </Button>
                <Button
                    variant='purple'
                    onClick={() => setActiveTab('boosts')}
                    disabled={activeTab === 'boosts'}
                >
                    Boosts
                </Button>
            </div>
        </div>
    )
}
