import { useLogout } from '@astro/session-client'
import { Button } from '../../shared/ui'

export const SignOutButton = () => {
    const logoutMutation = useLogout()
    return (
        <Button
            variant='blue'
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
        >
            Sign Out
        </Button>
    )
}
