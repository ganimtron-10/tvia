import { useAccount, useConnect, useReadContract } from 'wagmi'
import { useTdleContext } from './tdleContext'

export default function NavBar() {

    const { isConnected, connector, address: accountAddress } = useAccount()
    const { connectors, connect } = useConnect()
    const { CONTRACT_ABI, CONTRACT_ADDRESS } = useTdleContext()

    const { data, failureReason, isSuccess } = useReadContract({
        abi: CONTRACT_ABI as any,
        address: CONTRACT_ADDRESS as any,
        functionName: 'balanceOf',
        args: [accountAddress as any]
    })

    return <div className='flex items-center justify-center mx-5 gap-10'>
        <h1 className="text-5xl font-semibold p-2 text-center">Tdle</h1>
        {isConnected ?
            // <button onClick={() => connector?.disconnect()} className="my-2 p-2 border-2 rounded-full font-semibold">
            //     Disconnect Wallet
            // </button> 
            <>
                <w3m-account-button />
                <div className="p-1.5 border-2 rounded-full font-semibold">{data?.toString()} TDLE</div>
            </>
            :
            // <>{connectors.map((connector) => (
            //     <button
            //         key={connector.uid}
            //         onClick={() => connect({ connector })}
            //         className="my-2 p-2 border-2 rounded-full font-semibold "
            //     >
            //         Connect Wallet
            //     </button>
            // ))}</>

            <w3m-button />

        }

    </div>
}