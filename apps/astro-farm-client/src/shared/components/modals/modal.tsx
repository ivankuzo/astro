import { ReactNode } from 'react'
import { ModalBase, ContentContainer } from './modal-base'

interface ModalProps {
    children: ReactNode
    title?: string
    button?: ReactNode
}

export function Modal({ children, title = '', button }: ModalProps) {
    return (
        <ModalBase title={title} button={button}>
            <ContentContainer>{children}</ContentContainer>
        </ModalBase>
    )
}
