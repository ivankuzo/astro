import { ContentLayout } from '../../layouts/content'
import { Typography } from '../ui'

export const LoadingScreen = () => {
    return (
        <ContentLayout className='flex items-center justify-center bg-[#4B009A]'>
            <Typography textStroke='black'>Loading...</Typography>
        </ContentLayout>
    )
}
