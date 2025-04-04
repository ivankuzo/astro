import { forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@astro/client-cn'

export const typographyVariants = cva('', {
    variants: {
        variant: {
            h1: '',
            p: '',
            span: '',
        },
        textColor: {
            white: 'text-white',
        },
        textShadow: {
            true: '[text-shadow:0_0_2px_#000000,0_0_1px_#000000]',
            false: '',
        },
    },
    defaultVariants: {
        variant: 'p',
        textColor: 'white',
        textShadow: false,
    },
})

export interface TypographyProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof typographyVariants> {
    as?: React.ElementType
    textStroke?: string | null
}

export const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
    ({ className, textColor, textShadow, textStroke, variant, as, style, ...props }, ref) => {
        const variantMapping = {
            h1: 'h1',
            p: 'p',
            span: 'span',
        }

        const Component = as || variantMapping[variant || 'p']

        const textStrokeStyle = textStroke
            ? {
                  WebkitTextStroke: `1px ${textStroke}`,
                  fontWeight: 900,
              }
            : {}

        return (
            <Component
                className={cn(typographyVariants({ textColor, textShadow, variant, className }))}
                ref={ref}
                style={{
                    ...style,
                    ...textStrokeStyle,
                }}
                {...props}
            />
        )
    }
)

Typography.displayName = 'Typography'
