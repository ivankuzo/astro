import { NavLink } from 'react-router-dom'
import { GameContentLayout } from '../layouts/content'
import { Image, Typography } from '../shared/ui'

interface GamePreviewProps {
    to: string
    imagePath: string
    name: string
    description: string
}

const GamePreview = ({ to, imagePath, name, description }: GamePreviewProps) => {
    return (
        <NavLink to={to}>
            <div className='relative aspect-[3/2] overflow-hidden rounded-xl border-2 border-black/30'>
                <div className='absolute inset-0'>
                    <Image path={imagePath} className='h-full w-full object-cover object-center' />
                </div>
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/20 p-4 text-white'>
                    <Typography variant='h1' textStroke='black' className='text-center text-3xl'>
                        {name}
                    </Typography>
                    <Typography
                        variant='p'
                        textStroke='black'
                        className='w-2/3 text-center text-sm'
                    >
                        {description}
                    </Typography>
                </div>
            </div>
        </NavLink>
    )
}

const GamePreviewStub = ({ name, description }: { name: string; description: string }) => {
    return (
        <div className='relative aspect-[3/2] overflow-hidden rounded-xl border-2 border-black/30 bg-black'>
            <div className='absolute inset-0 flex flex-col items-center justify-center p-4 text-white'>
                <Typography variant='h1' textStroke='black' className='text-center text-3xl'>
                    {name}
                </Typography>
                <Typography variant='p' textStroke='black' className='w-2/3 text-center'>
                    {description}
                </Typography>
            </div>
        </div>
    )
}

export const GameList = () => {
    const realGames = [
        {
            to: '/mini-games/pipes',
            imagePath: 'mini-games/pipes/images/preview.png',
            name: 'Astro Pipes',
            description: 'Get your plant fertilizer system fixed!',
        },
    ]
    const stubs = [
        {
            name: 'Coming Soon',
            description: '',
        },
        {
            name: 'Coming Soon',
            description: '',
        },
    ]
    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {realGames.map(game => (
                <GamePreview key={game.name} {...game} />
            ))}
            {stubs.map(stub => (
                <GamePreviewStub key={stub.name} name={stub.name} description={stub.description} />
            ))}
        </div>
    )
}

export const MiniGamesPage = () => {
    return (
        <GameContentLayout className='px-4'>
            <GameList />
        </GameContentLayout>
    )
}
