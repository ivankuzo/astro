import ReactSlider from 'react-slider'
import { cn, WithClassName } from '@astro/client-cn'
import { Typography } from '../ui/typography'
import { MinusIcon, PlusIcon } from '../../assets/svg'

export interface RangeSliderProps extends WithClassName {
    value: number
    maxValue?: number
    onChange: (value: number) => void
}

export const RangeSlider = ({ value, maxValue = 10, onChange, className }: RangeSliderProps) => {
    const handleChange = (newValue: number) => {
        onChange(newValue)
    }

    const handleDecrease = () => {
        if (value > 1) {
            onChange(value - 1)
        }
    }

    const handleIncrease = () => {
        if (value < maxValue) {
            onChange(value + 1)
        }
    }

    return (
        <div className={cn('flex w-full items-center gap-4', className)}>
            <button onClick={handleDecrease}>
                <MinusIcon className='h-5 w-5' />
            </button>

            <div className='relative flex-1'>
                <ReactSlider
                    value={value}
                    min={1}
                    max={maxValue}
                    onChange={handleChange}
                    className='h-12 w-full'
                    thumbClassName='absolute -translate-y-1/2 z-10'
                    trackClassName='absolute top-1/2 -translate-y-1/2 h-4 rounded-xl bg-[#7100A9] shadow-[inset_0px_-1px_0.5px_#C858FF]'
                    renderThumb={(props, state) => (
                        <div
                            {...props}
                            className='flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD234] shadow-[0px_2px_2px_#7100A9,inset_0px_2px_2.5px_#FFE944,inset_0px_-2px_2px_#E38500]'
                        >
                            <Typography className='text-lg font-black'>
                                x{state.valueNow}
                            </Typography>
                        </div>
                    )}
                />
            </div>

            <button onClick={handleIncrease}>
                <PlusIcon className='h-5 w-5' />
            </button>
        </div>
    )
}
