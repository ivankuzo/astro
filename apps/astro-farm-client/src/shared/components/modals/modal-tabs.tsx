import { useState } from 'react'
import { cn } from '@astro/client-cn'
import { Typography } from '../../ui/typography'
import { ModalBase, ContentContainer } from './modal-base'

interface ModalTabsProps {
    title?: string
    tabs: TabPanelProps['tabs']
    activeTab?: string
    onTabChange?: (tabId: string) => void
}

export const ModalTabs = ({ title = '', tabs, activeTab, onTabChange }: ModalTabsProps) => {
    return (
        <ModalBase title={title}>
            <TabPanel tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
        </ModalBase>
    )
}

interface TabPanelProps {
    tabs: {
        id: string
        label: string | React.ReactNode
        content: React.ReactNode
    }[]
    activeTab?: string
    onTabChange?: (tabId: string) => void
}

export const TabPanel = ({ tabs, activeTab: controlledActiveTab, onTabChange }: TabPanelProps) => {
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

            <ContentContainer className='rounded-b-3xl rounded-t-none px-2 py-4 shadow-[inset_0px_-3px_0.5px_rgba(128,0,191,0.8)]'>
                {tabs.find(tab => tab.id === activeTab)?.content}
            </ContentContainer>
        </div>
    )
}
