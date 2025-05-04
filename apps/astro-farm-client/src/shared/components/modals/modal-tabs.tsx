import { useState } from 'react'
import { cn, WithClassName } from '@astro/client-cn'
import { Typography } from '../../ui/typography'
import { ModalBase } from './modal-base'

interface ModalTabsProps extends WithClassName {
    title?: string
    tabs: TabPanelProps['tabs']
    activeTab?: string
    onTabChange?: (tabId: string) => void
}

export const ModalTabs = ({
    title = '',
    tabs,
    activeTab,
    onTabChange,
    className,
}: ModalTabsProps) => {
    return (
        <ModalBase title={title}>
            <TabPanel
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
                className={className}
            />
        </ModalBase>
    )
}

interface TabPanelProps extends WithClassName {
    tabs: {
        id: string
        label: string | React.ReactNode
        content: React.ReactNode
    }[]
    activeTab?: string
    onTabChange?: (tabId: string) => void
}

export const TabPanel = ({
    tabs,
    activeTab: controlledActiveTab,
    onTabChange,
    className,
}: TabPanelProps) => {
    const [internalActiveTab, setInternalActiveTab] = useState(tabs[0].id)
    const activeTab = controlledActiveTab || internalActiveTab

    const handleTabChange = (tabId: string) => {
        if (onTabChange) {
            onTabChange(tabId)
        } else {
            setInternalActiveTab(tabId)
        }
    }

    return (
        <div>
            <div className='flex space-x-1'>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={cn(
                            'relative flex h-12 flex-1 items-center justify-center rounded-t-xl font-bold ',
                            activeTab === tab.id
                                ? 'bg-[#B010FF] text-base shadow-[inset_0px_1.5px_1px_#D684FF]'
                                : 'bg-[#861FCB] text-sm shadow-[inset_0px_1px_0.5px_#AE36FF]'
                        )}
                    >
                        {typeof tab.label === 'string' ? (
                            <Typography textStroke='#69009D' className='text-lg'>
                                {tab.label}
                            </Typography>
                        ) : (
                            tab.label
                        )}
                    </button>
                ))}
            </div>

            <div className='rounded-b-3xl rounded-t-none bg-[#B010FF] px-2 py-4 shadow-[inset_0px_-3px_0.5px_rgba(128,0,191,0.8)]'>
                <div className={cn('max-h-[500px] overflow-y-scroll', className)}>
                    {tabs.map(tab => tab.id === activeTab && <div key={tab.id}>{tab.content}</div>)}
                </div>
            </div>
        </div>
    )
}

//rounded-b-3xl rounded-t-none px-2 py-4 shadow-[inset_0px_-3px_0.5px_rgba(128,0,191,0.8)]
