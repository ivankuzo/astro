import { ReactNode } from 'react'
import { ModalBase } from './modal-base'
import { cn, WithClassName } from '@astro/client-cn'

interface ModalProps extends WithClassName {
    children: ReactNode
    title?: string
    button?: ReactNode
}

export function Modal({ children, title = '', button, className }: ModalProps) {
    return (
        <ModalBase title={title} button={button}>
            <div className='rounded-3xl bg-[#B010FF] p-2 shadow-[inset_0px_-3px_0.5px_rgba(128,0,191,0.8),inset_0px_1.5px_1px_#D684FF]'>
                <div className={cn('max-h-[500px] overflow-y-scroll', className)}>{children}</div>
            </div>
        </ModalBase>
    )
}
