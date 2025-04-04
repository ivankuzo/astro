import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAccount, useSignMessage } from 'wagmi'

import { createNonce, verifyNonce } from './api'

export const useLogin = () => {
    const queryClient = useQueryClient()
    const { address } = useAccount()
    const { signMessageAsync } = useSignMessage()

    return useMutation({
        mutationFn: async () => {
            if (!address) {
                throw new Error('Wallet is not connected')
            }

            const response = await createNonce({ walletAddress: address })

            const signature = await signMessageAsync({ message: response.nonce })

            await verifyNonce({
                walletAddress: address,
                signature,
            })

            return true
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
        },
    })
}
