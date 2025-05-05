import { forwardRef } from 'react'
import { Button, ButtonProps } from '../ui'
import { Image } from '../ui/image'
import { cn } from '@astro/client-cn'

interface IGCButtonProps extends Omit<ButtonProps, 'variant'> {
    value: number
}

export const IGCButton = forwardRef<HTMLButtonElement, IGCButtonProps>(
    ({ value, className, ...props }, ref) => {
        return (
            <Button ref={ref} variant='green' className={cn('gap-1 text-xl', className)} {...props}>
                <Image path='igc.png' className='h-6' />
                {value}
            </Button>
        )
    }
)
