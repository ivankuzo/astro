import { ContentLayout } from '../../layouts/content'
import { Typography } from '../ui'

export const ErrorScreen = ({ error }: { error: Error }) => {
    return (
        <ContentLayout className='flex items-center justify-center bg-[#4B009A]'>
            <Typography textStroke='black'>{error.message}</Typography>
        </ContentLayout>
    )
}
