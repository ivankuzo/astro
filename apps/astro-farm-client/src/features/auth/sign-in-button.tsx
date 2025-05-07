import { useLogin } from '@astro/session-client'
import { Button } from '../../shared/ui'

export const SignInButton = () => {
    const loginMutation = useLogin()
    return (
        <Button
            className='w-full'
            variant='purple'
            onClick={() => loginMutation.mutate()}
            disabled={loginMutation.isPending}
        >
            Sign In
        </Button>
    )
}
