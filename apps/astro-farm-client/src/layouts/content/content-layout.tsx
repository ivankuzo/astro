import { PropsWithChildren } from 'react'
import { cn, WithClassName } from '@astro/client-cn'

export const ContentLayout = ({
    children,
    className,
}: PropsWithChildren & WithClassName & { padding?: boolean }) => {
    return <div className={cn('min-h-screen w-full', 'px-4 py-4', className)}>{children}</div>
}
