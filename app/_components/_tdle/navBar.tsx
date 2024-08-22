import { useAccount, useConnect } from 'wagmi'

export default function NavBar() {

    const { isConnected, connector } = useAccount()
    const { connectors, connect } = useConnect()

    return <div className='flex items-center justify-center mx-5 gap-10'>
        <h1 className="text-5xl font-semibold p-2 text-center">Tdle</h1>
        {isConnected ?
            <button onClick={() => connector?.disconnect()} className="my-2 p-2 border-2 rounded-full font-semibold">
                Disconnect Wallet
            </button> : <>{connectors.map((connector) => (
                <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    className="my-2 p-2 border-2 rounded-full font-semibold "
                >
                    Connect Wallet
                </button>
            ))}</>}

    </div>
}