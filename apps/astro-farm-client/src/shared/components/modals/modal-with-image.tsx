import { ReactNode } from 'react'
import { ModalBase } from './modal-base'
import { Image } from '../../ui/image'
import { cn, WithClassName } from '@astro/client-cn'

interface ModalWithImageProps extends WithClassName {
    children: ReactNode
    title?: string
    button?: ReactNode
    imagePath: string
}

export function ModalWithImage({
    title,
    imagePath,
    children,
    button,
    className,
}: ModalWithImageProps) {
    return (
        <ModalBase title={title} button={button}>
            <div
                className={cn(
                    'rounded-3xl bg-[#B010FF] p-4 shadow-[inset_0px_-3px_0.5px_rgba(128,0,191,0.8),inset_0px_1.5px_1px_#D684FF]',
                    className
                )}
            >
                <div className='flex flex-row items-center gap-4'>
                    <div className='relative flex-shrink-0 pl-4'>
                        <ImageBackground />
                        <Image path={imagePath} className='relative z-20 h-auto w-24' />
                    </div>
                    <div className='flex-grow'>{children}</div>
                </div>
            </div>
        </ModalBase>
    )
}

const ImageBackground = () => {
    return (
        <div className='absolute left-[50%] top-1/2 z-10 aspect-square h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F8EBFF]/60 blur-md' />
    )
}
