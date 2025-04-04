import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const handleError = (e: unknown) => {
    if (e instanceof AxiosError) {
        toast.error(e.response?.data.message || e.message)
    } else if (e instanceof Error) {
        toast.error(e.message)
    } else {
        toast.error('Unknown error – check console')
    }
    console.log(e)
}
