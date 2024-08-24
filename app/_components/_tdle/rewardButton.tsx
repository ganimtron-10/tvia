import { useTdleContext } from "./tdleContext"
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

export default function RewardButton() {

    const { data: hash, error, isPending, status, writeContract } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })
    const { isConnected } = useAccount()

    const { UNIQUE_IDENTIFIER, CONTRACT_ABI, CONTRACT_ADDRESS, message, guesses, guessIndex, todaysWord, setShowRewardBtn, setMessage } = useTdleContext()

    function getTodaysMidnightTimeStamp() {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now.getTime() / 1000;
    }

    function AddGameData(rewardAmount: number = 10) {

        if (isConnected) {
            // setShowRewardBtn(false)

            console.log("Adding Game Data")
            // const { data: hash, error, isPending, status, writeContract } = useWriteContract()
            writeContract({
                abi: CONTRACT_ABI as any,
                address: CONTRACT_ADDRESS as any,
                functionName: 'creditPlayer',
                args: [UNIQUE_IDENTIFIER, getTodaysMidnightTimeStamp(), JSON.stringify({ stateMessage: message, stateGuesses: guesses, stateGuessIndex: guessIndex, stateTodaysWord: todaysWord }), rewardAmount]
            })

            // const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })

            console.log(hash, isPending, status)
            console.log(isConfirming, isConfirmed)
            console.log(error?.message)

            setMessage("Please be paitient, Transaction under Process")

            if (error) {
                if (error?.message.includes("You have already played todays Game!")) {
                    setMessage("Hurray! You already received the reward.")
                } else {
                    setMessage("Some unexpected Error occured")
                }
                // console.log(error?.message)
            }

            if (isPending) {
                setMessage("Transaction under Process Wait some Time...")
            }

            if (isConfirmed) {
                setMessage("Transaction Successful")
            }
        } else {
            setMessage("Please Connect your Wallet above ^")
        }


    }

    return <button onClick={() => {
        AddGameData()
    }} className="my-2 p-2 border-2 rounded-full font-semibold">
        {isConfirming ? "Transaction Under Process" : isConfirmed ? "Transaction Completed" : isConnected ? "Collect Reward" : "Please Connect your Wallet"}
    </button>
}