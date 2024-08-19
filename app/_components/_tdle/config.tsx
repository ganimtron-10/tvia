import { http, createConfig } from 'wagmi'
import { base, mainnet, arbitrumSepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'


export const config = createConfig({
    chains: [mainnet, base, arbitrumSepolia],
    transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
        [arbitrumSepolia.id]: http()
    },
})