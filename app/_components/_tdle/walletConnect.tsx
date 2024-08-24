'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount, useConnect } from 'wagmi'
import { metadata, config, projectId } from './config'
import Tdle from './tdle'
import { createWeb3Modal } from '@web3modal/wagmi/react'


createWeb3Modal({
    metadata,
    wagmiConfig: config,
    projectId,
})

const queryClient = new QueryClient()

function ConnectWallet() {
    const { isConnected } = useAccount()
    const { connectors, connect } = useConnect()

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            {isConnected ? (
                <Tdle />
            ) : (
                <div>
                    <h1 className="text-5xl font-semibold p-2 text-center">Tdle</h1>

                    {connectors.map((connector) => (
                        <button
                            key={connector.uid}
                            onClick={() => connect({ connector })}
                            className="my-2 p-2 border-2 rounded-full font-semibold "
                        >
                            Connect Wallet
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function WalletConnect() {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {/* <ConnectWallet /> */}
                <Tdle />
            </QueryClientProvider>
        </WagmiProvider>
    )
}