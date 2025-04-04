import { PropsWithChildren } from 'react'

import { QueryCache, MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { wagmiAdapter } from '../../config/wagmi-config'
import { WagmiProvider } from 'wagmi'
import NiceModal from '@ebay/nice-modal-react'
import { Toaster } from 'sonner'
import { handleError } from '@astro/client-errors'
import { PwaLoader } from './pwa-loader'
import { GameLoader } from './game-loader'

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: error => handleError(error),
    }),
    mutationCache: new MutationCache({
        onError: error => handleError(error),
    }),
})

export const Providers = ({ children }: PropsWithChildren) => (
    <PwaLoader>
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <NiceModal.Provider>
                        <GameLoader>{children}</GameLoader>
                        <Toaster
                            position='top-center'
                            toastOptions={{
                                className:
                                    'rounded-xl border border-black bg-white/10 backdrop-blur-xl text-white',
                            }}
                        />
                    </NiceModal.Provider>
                </BrowserRouter>
            </QueryClientProvider>
        </WagmiProvider>
    </PwaLoader>
)
