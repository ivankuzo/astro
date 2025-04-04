import { PropsWithChildren } from 'react'
import { Tooltip } from 'react-tooltip'
import { Typography } from '../../shared/ui'
import { cn } from '@astro/client-cn'

interface FieldActionTooltipProps extends PropsWithChildren {
    id: string
    title: string
}

export const FieldActionTooltip = ({ id, title, children }: FieldActionTooltipProps) => {
    return (
        <Tooltip
            id={id}
            clickable={true}
            className={cn(
                '!z-50 !rounded-2xl',
                '!bg-[#25004D]',
                '!p-3'
                // 'backdrop-blur-3xl'
                // '!shadow-[0px_1px_2px_#07001F,inset_0px_-3px_0.5px_#490195,inset_0px_2px_1px_#891AFF]'
            )}
            place='top'
            render={() => (
                <div className='flex min-w-[120px] flex-col items-center'>
                    <Typography className='text-center' textStroke='#2B0063'>
                        {title}
                    </Typography>
                    {children}
                </div>
            )}
        />
    )
}
