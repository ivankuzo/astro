import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { useModal } from '@ebay/nice-modal-react'
import { ReactNode } from 'react'
import { cn } from '@astro/client-cn'
import { Typography } from '../../ui/typography'
import { XIcon } from '../../../assets/svg'
import { AnimatePresence, motion } from 'framer-motion'

interface ModalBaseProps {
    children: ReactNode
    title?: string
    button?: ReactNode
}

const MotionDialogBackdrop = motion(DialogBackdrop)
const MotionDialogPanel = motion(DialogPanel)

export const ModalBase = ({ children, title = '', button }: ModalBaseProps) => {
    const modal = useModal()

    return (
        <AnimatePresence>
            {modal.visible && (
                <Dialog open={modal.visible} onClose={() => modal.hide()} className='relative z-50'>
                    <MotionDialogBackdrop
                        className='fixed inset-0 bg-black/30'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.2,
                        }}
                    />

                    <div className='fixed inset-0 flex items-center justify-center p-4'>
                        <MotionDialogPanel
                            className={cn(
                                'w-full max-w-md',
                                'rounded-3xl bg-[#6900D9] px-2 py-4 text-white',
                                'shadow-[0px_1px_2px_#07001F,inset_0px_-3px_0.5px_#490195,inset_0px_2px_1px_#891AFF]',
                                'relative'
                            )}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{
                                damping: 15,
                                stiffness: 300,
                                duration: 0.2,
                            }}
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
                                <div
                                    className={cn('mt-4 flex justify-center', {
                                        'mt-0': !children,
                                    })}
                                >
                                    {button}
                                </div>
                            )}
                        </MotionDialogPanel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
