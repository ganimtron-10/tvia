import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { http, createConfig } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
// export const config = createConfig({
//     chains: [arbitrumSepolia],
//     connectors: [walletConnect({
//         projectId: '4c0f2636de227a57ee1344455832fbf7',
//     }),],
//     transports: {
//         [mainnet.id]: http(),
//         [base.id]: http(),
//         [arbitrumSepolia.id]: http()
//     },
// })

export const metadata = {
    name: 'TDLE',
    description: 'Telegram mini app worDLE',
    url: 'https://tvia.vercel.app',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [arbitrumSepolia] as const
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
})