import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { useModal } from '@ebay/nice-modal-react'
import { ReactNode } from 'react'
import { cn } from '@astro/client-cn'
import { Typography } from '../../ui/typography'
import { XIcon } from '../../../assets/svg'

interface ModalBaseProps {
    children: ReactNode
    title?: string
    button?: ReactNode
}

export function ModalBase({ children, title = '', button }: ModalBaseProps) {
    const modal = useModal()

    return (
        <Dialog open={modal.visible} onClose={() => modal.hide()} className='relative z-50'>
            <DialogBackdrop className='fixed inset-0 bg-black/30' />

            <div className='fixed inset-0 flex items-center justify-center p-4'>
                <DialogPanel
                    className={cn(
                        'w-full max-w-md ',
                        'rounded-3xl bg-[#6900D9] p-4 text-white',
                        'shadow-[0px_1px_2px_#07001F,inset_0px_-3px_0.5px_#490195,inset_0px_2px_1px_#891AFF]',
                        'relative'
                    )}
                >
                    <button className='absolute right-5 top-4' onClick={() => modal.hide()}>
                        <XIcon className='w-6' />
                    </button>

                    <div className='mb-4 px-6'>
                        <Typography
                            variant='h1'
                            className='truncate text-center text-xl'
                            textStroke='#410087'
                            textShadow={true}
                        >
                            {title}
                        </Typography>
                    </div>
                    {children}

                    {button && (
                        <div className={cn('mt-4 flex justify-center', { 'mt-0': !children })}>
                            {button}
                        </div>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export interface ContentContainerProps {
    children: ReactNode
    className?: string
    contentClassName?: string
}

export function ContentContainer({ children, className, contentClassName }: ContentContainerProps) {
    return (
        <div
            className={cn(
                'rounded-3xl bg-[#B010FF] p-4 shadow-[inset_0px_-3px_0.5px_rgba(128,0,191,0.8),inset_0px_1.5px_1px_#D684FF]',
                className
            )}
        >
            <div className={cn('max-h-[500px] overflow-y-scroll', contentClassName)}>
                {children}
            </div>
        </div>
    )
}
