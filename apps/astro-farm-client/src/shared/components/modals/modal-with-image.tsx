import { ReactNode } from 'react'
import { ModalBase, ContentContainer } from './modal-base'
import { Image } from '../../ui/image'

interface ModalWithImageProps {
    children: ReactNode
    title?: string
    button?: ReactNode
    imagePath: string
}

export function ModalWithImage({ title, imagePath, children, button }: ModalWithImageProps) {
    return (
        <ModalBase title={title} button={button}>
            <ContentContainer>
                <div className='flex flex-row items-center gap-4'>
                    <div className='relative flex-shrink-0 pl-4'>
                        <ImageBackground />
                        <Image path={imagePath} className='relative z-20 h-auto w-24' />
                    </div>
                    <div className='flex-grow'>{children}</div>
                </div>
            </ContentContainer>
        </ModalBase>
    )
}

const ImageBackground = () => {
    return (
        <div className='absolute left-[50%] top-1/2 z-10 aspect-square h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F8EBFF]/60 blur-md' />
    )
}
