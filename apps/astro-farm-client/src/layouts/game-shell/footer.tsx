import { NavLink, useMatch } from 'react-router-dom'

import { Typography } from '../../shared/ui/typography'
import { Image } from '../../shared/ui/image'
import { cn } from '@astro/client-cn'

const navigationItems = [
    { path: '/shop/seeds', title: 'Shop', image: 'nav/shop.png', pattern: '/shop/*' },
    { path: '/dome', title: 'Dome', image: 'nav/dome.png' },
    { path: '/fields', title: 'Fields', image: 'nav/fields.png' },
    { path: '/player', title: 'Player', image: 'nav/lock.png' },
    { path: '/wallet', title: 'Wallet', image: 'nav/wallet.png' },
]

export const Footer = () => {
    return (
        <footer className='h-16 w-full rounded-t-[20px] border-t-2 border-[#6500E9] bg-[#4B02AB]'>
            <div className='inline-flex h-full w-full'>
                {navigationItems.map(item => (
                    <Item key={item.path} {...item} />
                ))}
            </div>
        </footer>
    )
}

interface ItemProps {
    path: string
    title: string
    image: string
    pattern?: string
}

const Item = ({ path, title, image, pattern }: ItemProps) => {
    const isActive = useMatch(pattern || path)

    return (
        <NavLink
            to={path}
            className={cn(
                'flex h-full w-1/5 flex-col items-center justify-center pb-3',
                isActive &&
                    'rounded-t-[20px] bg-gradient-to-b from-[#C192FF] to-[#872BFF] shadow-[inset_0px_1px_0.2px_#D1AEFF]'
            )}
        >
            <Image path={image} alt={title} className='mb-1 h-8 w-auto' />
            <Typography className='text-xs' textStroke='black'>
                {title}
            </Typography>
        </NavLink>
    )
}

//divide-x-2 divide-[#2D0068]
