import { createAppKit } from '@reown/appkit/react'
import { aurora, auroraTestnet } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const projectId = 'cf565263acb69343161dc6ed3a140492'

const metadata = {
    name: 'Astro Farm',
    description: 'Astro Farm',
    url: 'https://astro-farm.com',
    icons: ['https://avatars.githubusercontent.com/u/179229932'],
}

export const wagmiAdapter = new WagmiAdapter({
    networks: [aurora, auroraTestnet],
    projectId,
})

createAppKit({
    adapters: [wagmiAdapter],
    networks: [aurora, auroraTestnet],
    metadata,
    projectId,
    // features: {
    //     analytics: true,
    //     onramp: true,
    // },
    includeWalletIds: [
        '76260019aec5a3c44dd2421bf78e80f71a6c090d932c413a287193ed79450694', // Aurora Pass
    ],
})
