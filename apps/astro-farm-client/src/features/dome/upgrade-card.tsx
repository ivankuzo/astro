import { canUpgrade, DomeUpgradeType, getUpgradeCost } from '@astro/astro-farm-game-core'

import { Typography } from '../../shared/ui/typography'
import { useGame } from '../../shared/hooks/use-game'
import { getImagePath, getUpgradeTitle, getUpgradeValues } from './utils'
import { getName } from './utils'
import { Image } from '../../shared/ui/image'
import { cn } from '@astro/client-cn'
import { CheckmarkIcon } from '../../assets/svg'
import { useUpgradeDome } from '../../shared/hooks/use-upgrade-dome'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const UpgradeHeader = ({ isMax, title }: { isMax: boolean; title: string }) => {
    return (
        <div
            className={cn(
                'absolute left-0 right-0 top-0',
                'flex h-[40px]',
                'items-center justify-center',
                'gap-2',
                'font-bold',
                isMax ? 'bg-[#009AD6]' : 'bg-[#9800DE]'
            )}
        >
            <Typography>{title}</Typography>
        </div>
    )
}

const UpgradeImage = ({ imagePath }: { imagePath: string }) => {
    return (
        <div className='absolute left-0 right-0 top-[24%] flex items-center justify-center'>
            <Image path={imagePath} className='h-[45px]' />
        </div>
    )
}

const UpgradeDetails = ({ current, next }: { current: string; next: string | null }) => {
    return (
        <div className='absolute left-0 right-0 top-[46%] flex items-center justify-center space-x-1 font-extrabold'>
            <Typography className='text-xs'>{current}</Typography>
            <Typography className='text-[#CAFF1C]'>{next}</Typography>
        </div>
    )
}

const UpgradeName = ({ name }: { name: string }) => {
    return (
        <div className='absolute left-0 right-0 top-[58%] px-4 text-center'>
            <Typography variant='p' className='text-xs font-bold text-[#330075]'>
                {name}
            </Typography>
        </div>
    )
}

const UpgradePrice = ({ isMax, cost }: { isMax: boolean; cost: number | null }) => {
    return (
        <div
            className={cn(
                'absolute bottom-0 left-0 right-0',
                'flex h-[40px]',
                'items-center justify-center',
                'gap-2',
                isMax ? 'bg-[#009AD6]' : 'bg-[#9800DE]'
            )}
        >
            {isMax ? (
                <>
                    <Image path='igc.png' className='h-7' />
                    <Typography className='font-black'>{cost}</Typography>
                </>
            ) : (
                <CheckmarkIcon className='w-7' />
            )}
        </div>
    )
}

export const UpgradeCard = ({ upgradeType }: { upgradeType: DomeUpgradeType }) => {
    const { data: game } = useGame()
    const upgradeDomeMutation = useUpgradeDome()
    const [searchParams] = useSearchParams()
    const [isHighlighted, setIsHighlighted] = useState(false)

    // Проверяем, нужно ли подсветить эту карточку
    useEffect(() => {
        const highlightParam = searchParams.get('highlight')
        if (highlightParam === upgradeType) {
            setIsHighlighted(true)

            const timer = setTimeout(() => {
                setIsHighlighted(false)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [searchParams, upgradeType])

    if (!game) return null

    const currentLevel = game.dome[upgradeType]
    const cost = getUpgradeCost(game.dome, upgradeType)
    const isMax = canUpgrade(game.dome, upgradeType)
    const name = getName(upgradeType)
    const title = getUpgradeTitle(upgradeType, currentLevel)
    const imagePath = getImagePath(upgradeType)
    const upgradeValues = getUpgradeValues(upgradeType, currentLevel)

    const handleUpgrade = () => {
        if (!isMax) return null
        upgradeDomeMutation.mutate({
            body: {
                type: upgradeType,
            },
        })
    }
    return (
        <button
            className={cn(
                'relative h-[200px] w-[125px] overflow-y-scroll rounded-2xl border-2',
                isMax ? 'border-[#00176C] bg-[#0EBDFD]' : 'border-[#540063] bg-[#D746FF]',
                isHighlighted && 'border-4 border-yellow-400',
                upgradeDomeMutation.isPending && 'opacity-50'
            )}
            onClick={handleUpgrade}
            disabled={upgradeDomeMutation.isPending}
        >
            <UpgradeHeader isMax={isMax} title={title} />
            <UpgradeImage imagePath={imagePath} />
            <UpgradeDetails current={upgradeValues.current} next={upgradeValues.next} />
            <UpgradeName name={name} />
            <UpgradePrice isMax={isMax} cost={cost} />
        </button>
    )
}
