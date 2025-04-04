import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useCookies } from 'react-cookie'
import { getAddress } from 'viem'
import { SESSION_COOKIES } from '@astro/session-api-contracts'

export const useAuthStatus = (): boolean => {
    const { address } = useAccount()
    const [cookies] = useCookies([SESSION_COOKIES.userWallet])

    return useMemo(() => {
        if (!address || !cookies[SESSION_COOKIES.userWallet]) {
            return false
        }

        return getAddress(address) === getAddress(cookies[SESSION_COOKIES.userWallet])
    }, [address, cookies])
}
