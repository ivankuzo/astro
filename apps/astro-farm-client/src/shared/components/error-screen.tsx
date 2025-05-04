import { Typography } from '../ui'

export const ErrorScreen = ({ error }: { error: Error }) => {
    return (
        <div className='flex h-screen items-center justify-center bg-[#4B009A] px-4'>
            <Typography textStroke='black'>{error.message}</Typography>
        </div>
    )
}
