import { forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@astro/client-cn'
import { Image } from '../ui/image'
import { Typography } from '../ui/typography'

const fillVariants = cva('absolute bottom-0 left-0 top-0 h-full rounded-3xl', {
    variants: {
        variant: {
            purple: [
                'bg-gradient-to-b from-[#CA67FF] from-[12.5%] to-[#8900D3] to-[85%]',
                'shadow-[inset_0px_2px_3px_rgba(227,133,255,0.8),inset_0px_-4px_2px_#7600B7]',
            ],
            blue: [
                'bg-gradient-to-b from-[#63E1FF] from-[0.09%] to-[#0078E1] to-[99.91%]',
                'shadow-[inset_0px_-4px_2px_rgba(0,107,228,0.8),inset_0px_3px_2px_#65E8FF]',
            ],
        },
    },
    defaultVariants: {
        variant: 'purple',
    },
})

export interface ProgressBarProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof fillVariants> {
    value?: number
    maxValue?: number
    showValue?: boolean
    imagePath?: string
    text?: string
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
    (
        {
            className,
            value = 0,
            maxValue = 100,
            showValue = false,
            imagePath,
            text,
            variant,
            ...props
        },
        ref
    ) => {
        const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100))

        return (
            <div className={cn('relative w-full', className)}>
                {imagePath && (
                    <div className='absolute -left-1.5 top-1/2 z-20 -translate-y-1/2'>
                        <Image path={imagePath} className='h-8' />
                    </div>
                )}

                <div
                    className={cn(
                        'relative flex h-[22px] items-center overflow-hidden rounded-3xl border border-black bg-[#22004D]/40',
                        imagePath ? 'pl-6' : ''
                    )}
                    ref={ref}
                    {...props}
                >
                    <div
                        className={fillVariants({ variant })}
                        style={{ width: `${percentage}%` }}
                    />

                    <div className='absolute inset-0 z-10 flex items-center justify-center'>
                        {(text || showValue) && (
                            <div
                                className={cn(
                                    'text-center font-bold text-white',
                                    imagePath ? 'pl-4' : ''
                                )}
                            >
                                <Typography variant='span' textStroke='black'>
                                    {text || (showValue ? `${value}/${maxValue}` : '')}
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
)
