import { forwardRef } from 'react'
import { cn } from '@astro/client-cn'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    path: string
    fallback?: string
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ className, path, fallback, alt, ...props }, ref) => {
        const imagePath = `/images/${path}`

        return (
            <img
                className={cn('', className)}
                src={imagePath}
                alt={alt || 'image'}
                onError={e => {
                    if (fallback) {
                        e.currentTarget.src = `/images/${fallback}`
                    }
                }}
                ref={ref}
                {...props}
            />
        )
    }
)
