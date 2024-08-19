import { useAccount } from 'wagmi'
import { disconnect } from 'wagmi/actions'

export default function NavBar() {

    const { isConnected, connector } = useAccount()

    return <div className='flex items-center justify-center mx-5 gap-40'>
        <h1 className="text-5xl font-semibold p-2 text-center">Tdle</h1>
        {isConnected ?
            <button onClick={() => connector?.disconnect()} className="my-2 p-2 border-2 rounded-full">
                Disconnect Wallet
            </button> : <></>}

    </div>
}