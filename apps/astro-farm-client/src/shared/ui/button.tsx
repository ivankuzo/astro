import { forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@astro/client-cn'

export const buttonVariants = cva(
    [
        'relative',
        'inline-flex',
        'items-center',
        'justify-center',
        'transition-colors',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-offset-2',
        'border',
        'bg-gradient-to-b',
        'text-white',
        'truncate',
        'disabled:cursor-not-allowed',
        'font-black',
    ],
    {
        variants: {
            variant: {
                purple: [
                    'from-[#CE79FF] from-[12.5%] to-[#A509FF] to-[85%]',
                    'border-[#B028FF]',
                    'shadow-[0px_1px_2px_rgba(35,0,81,0.8),inset_0px_2px_0.6px_#DA9BFF,inset_0px_-4px_0.5px_#9200E6,inset_0px_-5px_4.7px_#CA6FFF,inset_2px_0px_0.5px_#C666FE,inset_-2px_0px_0.5px_#C96EFF]',
                    '[-webkit-text-stroke:1px_#8700D4]',
                    '[text-shadow:0px_0.7px_1px_rgba(113,0,178,0.8)]',
                    'disabled:from-[#A454FF] disabled:from-[6.25%] disabled:to-[#5B02C8] disabled:to-[87.5%]',
                    'disabled:border-[#8A2AFF]',
                    'disabled:shadow-[0px_1px_2px_rgba(35,0,81,0.8),inset_0px_2px_0.6px_#B474FF,inset_0px_-4px_0.5px_#5B02C8,inset_0px_-5px_4.7px_#B474FF,inset_2px_0px_0.5px_#B474FF,inset_-2px_0px_0.5px_#B474FF]',
                    'disabled:[-webkit-text-stroke:1px_#5300B9]',
                    'disabled:[text-shadow:0px_0.7px_1px_rgba(83,0,186,0.8)]',
                ],
                blue: [
                    'from-[#16CBFD] from-[12.5%] to-[#006BB3] to-[85%]',
                    'border-[#00BDE3]',
                    'shadow-[0px_1px_2px_rgba(35,0,81,0.8),inset_0px_3px_2px_#7BEBFF,inset_0px_-4px_0.5px_#0073CE,inset_0px_-6px_4.5px_#00C5F1,inset_2px_0px_2px_#00C5F1,inset_-2px_0px_2px_#00C5F1]',
                    '[text-shadow:0_0_1px_#015598,0_0_1px_#015598]',
                    '[-webkit-text-stroke:1px_#015598]',
                    'disabled:from-[#0D9BBF] disabled:to-[#00507F]',
                    'disabled:border-[#0088A7]',
                    'disabled:shadow-[0px_1px_2px_rgba(35,0,81,0.8),inset_0px_3px_2px_#55ACBF,inset_0px_-4px_0.5px_#00507F]',
                ],
                green: [
                    'from-[#7BFF2C] from-[12.5%] to-[#028935] to-[85%]',
                    'border-[#019E4E]',
                    'shadow-[0px_1px_2px_rgba(35,0,81,0.8),inset_0px_3px_2px_#94FF59,inset_0px_-4px_0.5px_#00803F,inset_0px_-6px_4.5px_#00B72A,inset_2px_0px_2px_#4BD300,inset_-2px_0px_2px_#4BD300]',
                    '[text-shadow:0_0_1px_#00803F,0_0_1px_#00803F]',
                    '[-webkit-text-stroke:1px_#00803F]',
                    'disabled:from-[#5ABF20] disabled:to-[#016625]',
                    'disabled:border-[#01723A]',
                    'disabled:shadow-[0px_1px_2px_rgba(35,0,81,0.8),inset_0px_3px_2px_#6DBF42,inset_0px_-4px_0.5px_#016625]',
                ],
                orange: [
                    'from-[#FFD337] from-[5%] to-[#E46800] to-[85%]',
                    'border-[#F07400]',
                    'shadow-[0px_1px_2px_rgba(35,0,81,0.8),inset_0px_2px_0.6px_#FFD850,inset_0px_-4px_0.5px_#CA5D01,inset_0px_-5px_4.7px_#FFD850,inset_2px_0px_3px_#FFD850,inset_-2px_0px_3px_#FFD850]',
                    '[text-shadow:0_0_1px_#E36A01,0_0_1px_#E36A01]',
                    '[-webkit-text-stroke:1px_#E36A01]',
                    'disabled:from-[#BF9D29] disabled:to-[#A94E00]',
                    'disabled:border-[#B05600]',
                    'disabled:shadow-[0px_1px_2px_rgba(35,0,81,0.8),inset_0px_2px_0.6px_#BFA23C,inset_0px_-4px_0.5px_#954400]',
                ],
            },
            size: {
                sm: 'h-8 px-3 text-sm rounded-lg',
                lg: 'h-12 px-6 text-xl rounded-xl',
            },
        },
        defaultVariants: {
            variant: 'purple',
            size: 'lg',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
