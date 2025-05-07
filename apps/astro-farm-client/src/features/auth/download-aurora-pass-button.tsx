import { Button } from '../../shared/ui/button'

const URL = 'https://aurorapass.app/'

export const DownloadAuroraPassButton = () => {
    return (
        <a href={URL} target='_blank' rel='noopener noreferrer' className='w-full'>
            <Button className='w-full' variant='green'>
                Download Aurora Pass
            </Button>
        </a>
    )
}
