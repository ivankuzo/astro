import NiceModal from '@ebay/nice-modal-react'
import { useState } from 'react'
import { Typography } from '../../shared/ui/typography'
import { Image } from '../../shared/ui/image'
import { ArrowRightIcon } from '../../assets/svg'
import { ArrowLeftIcon } from '../../assets/svg'
import { ModalBase } from '../../shared/components/modals/modal-base'
import { ONBOARDING_DATA } from './data'
import { cn } from '@astro/client-cn'

type SlideProps = {
    title: string
    description: string
    imagePath: string
}

const Slide = ({ title, description, imagePath }: SlideProps) => (
    <div className='h-[70vh] max-h-[500px]'>
        <Image path={imagePath} className='w-full' />
        <Typography variant='h1' textStroke='black' className='mt-2 text-center text-xl uppercase'>
            {title}
        </Typography>
        <Typography variant='p' className='px-2 text-center font-semibold'>
            {description}
        </Typography>
    </div>
)

export const OnboardingModal = NiceModal.create(() => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const isFirstSlide = currentSlide === 0
    const isLastSlide = currentSlide === ONBOARDING_DATA.length - 1

    const handleNext = () => setCurrentSlide(prev => prev + 1)
    const handlePrev = () => setCurrentSlide(prev => Math.max(0, prev - 1))

    return (
        <ModalBase title='HOW TO PLAY'>
            <Slide {...ONBOARDING_DATA[currentSlide]} />

            <div className='mt-4 flex items-center justify-between'>
                <button
                    onClick={handlePrev}
                    disabled={isFirstSlide}
                    className={cn('p-2', isFirstSlide && 'opacity-30')}
                >
                    <ArrowLeftIcon />
                </button>
                <div className='flex gap-1'>
                    {ONBOARDING_DATA.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                'h-2 w-2 rounded-full',
                                index === currentSlide
                                    ? 'bg-gradient-to-t from-[#A509FF] to-[#D88BFF]'
                                    : 'bg-[#36007C]'
                            )}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    disabled={isLastSlide}
                    className={cn('p-2', isLastSlide && 'opacity-30')}
                >
                    <ArrowRightIcon />
                </button>
            </div>
        </ModalBase>
    )
})
