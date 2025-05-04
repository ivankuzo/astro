import { PropsWithChildren } from 'react'
import { cn, WithClassName } from '@astro/client-cn'

import { Footer } from './footer'
import { Header } from './header'
import { StarryBackground } from './starry-background'

export const GameShell = ({ children, className }: PropsWithChildren & WithClassName) => {
    return (
        <div className={cn('min-h-screen bg-[#4B009A]', className)}>
            <StarryBackground />
            <div className={cn('fixed left-0 right-0 top-0 z-50')}>
                <Header />
            </div>
            <main>{children}</main>
            <div className={cn('fixed bottom-0 left-0 right-0 z-50 bg-none')}>
                <Footer />
            </div>
        </div>
    )
}
