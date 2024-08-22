'use client'

import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import validWords from './validWords.json'
import crypto from 'crypto';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

const CONTRACT_ABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI as string)
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
const UNIQUE_IDENTIFIER = process.env.NEXT_PUBLIC_UNIQUE_IDENTIFIER as string

interface TdleContextType {
    message: string;
    setMessage: (newState: string) => void;
    guesses: string[];
    setGuesses: (newState: string[]) => void;
    guessIndex: number;
    setGuessIndex: (newState: number) => void;
    handleInput: (key: string) => void;
    hasChar: (char: string, idx: number, isKeyChar?: boolean) => boolean;
    sameChar: (char: string, i: number, idx: number, isKeyChar?: boolean) => boolean;
    UNIQUE_IDENTIFIER: string;
    CONTRACT_ADDRESS: string;
    CONTRACT_ABI: string;
    showRewardBtn: boolean;
    todaysWord: string;
    setShowRewardBtn: (newState: boolean) => void;
}

interface GameData {
    stateMessage: string
    stateGuesses: string[]
    stateGuessIndex: number
    stateTodaysWord: string
}


const TdleContext = createContext<TdleContextType | null>(null);

export function TdleProvider({ children }: { children: ReactNode }) {

    // const { data: hash, error, isPending, status, writeContract } = useWriteContract()
    // const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })
    // const { address: accountAddress } = useAccount()

    const [message, setMessage] = useState('');
    const [guesses, setGuesses] = useState<string[]>(Array(6).fill(''));
    const [guessIndex, setGuessIndex] = useState(0);
    const todaysWord = generateTodaysWord();
    // const [fetchGameData, setFetchGameData] = useState(false)
    const [showRewardBtn, setShowRewardBtn] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            handleInput(event.key.toLowerCase());
        };

        window.addEventListener('keyup', handleKeyDown);

        return () => {
            window.removeEventListener('keyup', handleKeyDown);
        };
    }, [handleInput]);

    function getTodaysMidnightTimeStamp() {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now.getTime() / 1000;
    }

    // function FetchGameData() {
    //     if (!fetchGameData) {
    //         const { data, failureReason, isSuccess } = useReadContract({
    //             abi: CONTRACT_ABI,
    //             address: CONTRACT_ADDRESS as any,
    //             functionName: 'getGameDataByAddressAndDay',
    //             account: accountAddress as any,
    //             args: [getTodaysMidnightTimeStamp()]
    //         })

    //         console.log(data, isSuccess, failureReason?.shortMessage);

    //         if (isSuccess) {
    //             setMessage((data as GameData).stateMessage)
    //             setGuesses((data as GameData).stateGuesses)
    //             setGuessIndex((data as GameData).stateGuessIndex)

    //             setFetchGameData(true)
    //         } else {
    //             setMessage(failureReason?.shortMessage ? failureReason?.shortMessage : "")
    //         }
    //     }
    // }

    // function AddGameData(rewardAmount: number) {

    //     console.log("Adding Game Data")

    //     writeContract({
    //         abi: CONTRACT_ABI,
    //         address: CONTRACT_ADDRESS as any,
    //         functionName: 'creditPlayer',
    //         args: [UNIQUE_IDENTIFIER, getTodaysMidnightTimeStamp(), JSON.stringify({ stateMessage: message, stateGuesses: guesses, stateGuessIndex: guessIndex, stateTodaysWord: todaysWord }), rewardAmount]
    //     })

    //     // const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })

    //     console.log(hash, isPending, status)
    //     console.log(isConfirming, isConfirmed)
    //     console.log(error?.message)

    // }








    function generateTodaysWord() {
        const today = new Date();

        const hashBuffer = crypto.createHash('sha256').update(`${today.getDate()}${today.getMonth()}${today.getFullYear()}`).digest();
        const hashValue = parseInt(hashBuffer.toString('hex'), 16);
        const randomIndex = hashValue % validWords.length;

        // console.log(validWords[randomIndex])
        return validWords[randomIndex];
    }

    function submitGuess(guess: string) {
        if (guess.length == 5) {
            if (validWords.includes(guess)) {
                setGuessIndex((prevGuessIndex) => prevGuessIndex + 1)

                if (guess === todaysWord) {
                    setMessage("You Guessed it Right :)")
                    setShowRewardBtn(true)
                    // AddGameData(10)
                } else if (guessIndex === 5) {
                    setMessage(`Oops! Better Luck Next Time. The word was "${todaysWord.toUpperCase()}".`)
                    // AddGameData(0)
                } else {
                    setMessage(`${5 - guessIndex} tries remaining...`)
                }
            } else {
                setMessage("Guess word not in Word List :(")
            }
        } else {
            setMessage("Guess Word should be exactly 5 letters long!")
        }
    }

    function allGuesses() {
        return guesses.slice(0, guessIndex).join("").toLowerCase().split("")
    }

    function hasChar(char: string, idx: number, isKeyChar?: boolean) {
        if (isKeyChar) {
            return todaysWord.includes(char) && allGuesses().includes(char)
        } else {
            if (idx < guessIndex) {
                return todaysWord.includes(char)
            }
        }
        return false
    }

    function sameChar(char: string, i: number, idx: number, isKeyChar?: boolean) {
        if (isKeyChar) {
            return guesses.slice(0, guessIndex).map((guess) => {
                let result = false;
                if (guess.includes(char)) {
                    result = result || (guess.indexOf(char) === todaysWord.indexOf(char))
                }
                return result;
            }).some((value) => {
                if (value) return true
            })
        } else {
            if (idx < guessIndex && todaysWord) {
                return todaysWord[i] === char
            }
        }
        return false;
    }

    function win() {
        if (guesses[guessIndex - 1] === todaysWord) {
            setMessage("You Guessed it Right :)")
            return guesses[guessIndex - 1] === todaysWord
        }
        return false
    }

    function loss() {
        if (guessIndex === 6) {
            setMessage(`Oops! Better Luck Next Time. The word was "${todaysWord.toUpperCase()}".`)
            return true
        }
        return false
    }

    function handleInput(key: string) {
        // console.log(key, guesses, guessIndex)

        if (win() || loss()) {
            return
        }

        let message = guesses[guessIndex]

        if (key === 'enter') {
            submitGuess(message);
        } else if (key === 'clear' || key === 'backspace') {
            const newGuesses = [...guesses];
            newGuesses[guessIndex] = message.slice(0, message.length - 1);
            setGuesses(newGuesses);
        } else if (/^[A-z]$/.test(key.toLowerCase()) && message.length != 5) {
            const newGuesses = [...guesses];
            newGuesses[guessIndex] += key;
            setGuesses(newGuesses);
        }
    }

    const value: TdleContextType = {
        message,
        setMessage,
        guesses,
        setGuesses,
        guessIndex,
        setGuessIndex,
        handleInput,
        hasChar,
        sameChar,
        UNIQUE_IDENTIFIER,
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        showRewardBtn,
        todaysWord,
        setShowRewardBtn
    };

    return (
        <TdleContext.Provider value={value}>
            {children}
        </TdleContext.Provider>
    );
}

export const useTdleContext = () => {
    const context = useContext(TdleContext);
    if (!context) {
        throw new Error('useTdleContext must be used within a TdleProvider');
    }
    return context;
};