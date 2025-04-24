import { ENERGY_REGEN } from '@astro/astro-farm-game-core'
import { ProgressBar, Typography } from '../../shared/ui'
import { useCurrentEnergy } from './use-current-energy'

const EnergyRegenInfo = () => {
    const energyRegenPer5Minutes = ENERGY_REGEN * 60 * 5
    const text = `+${energyRegenPer5Minutes} energy / 5 min`

    // return (
    //     <div className='ml-4 rounded-t-2xl border border-b-0 border-black bg-[#22004D]/40 px-2 py-1'>
    //         <Typography className='text-xs' textStroke='black'>
    //             {text}
    //         </Typography>
    //     </div>
    // )

    return (
        //absolute -top-6 left-1/2 ml-4 -translate-x-1/2
        <div className='absolute -top-6 left-0 ml-4'>
            <Typography className='text-xs' textStroke='black'>
                {text}
            </Typography>
        </div>
    )
}

export const EnergyProgressBar = () => {
    const { currentEnergy, maxEnergy } = useCurrentEnergy()
    if (!currentEnergy || !maxEnergy) return null
    return (
        <div className='relative w-full'>
            <EnergyRegenInfo />
            <ProgressBar
                value={Math.floor(currentEnergy)}
                maxValue={maxEnergy}
                variant='blue'
                showValue
                imagePath='energy.png'
            />
        </div>
    )
}
