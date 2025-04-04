import { PropsWithChildren } from 'react'
import { cn, WithClassName } from '@astro/client-cn'

export const GameContentLayout = ({ children, className }: PropsWithChildren & WithClassName) => {
    return (
        <div
            className={cn(
                'fixed inset-x-0',
                'bottom-16 top-20',
                'overflow-y-auto overflow-x-hidden',
                'pb-4',
                className
            )}
        >
            {children}
        </div>
    )
}
