'use client'

import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import validWords from './validWords.json'
import crypto from 'crypto';

interface TdleContextType {
    message: string;
    setMessage: (newState: string) => void;
    guesses: string[];
    setGuesses: (newState: string[]) => void;
    guessIndex: number;
    setGuessIndex: (newState: number) => void;
    handleInput: (key: string) => void;
    hasChar: (char: string, idx: number) => boolean;
    sameChar: (char: string, i: number, idx: number) => boolean;
}

const TdleContext = createContext<TdleContextType | null>(null);

export function TdleProvider({ children }: { children: ReactNode }) {

    const [message, setMessage] = useState('');
    const [guesses, setGuesses] = useState<string[]>(Array(6).fill(''));
    const [guessIndex, setGuessIndex] = useState(0);
    const todaysWord = generateTodaysWord();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            handleInput(event.key.toLowerCase());
        };

        window.addEventListener('keyup', handleKeyDown);

        return () => {
            window.removeEventListener('keyup', handleKeyDown);
        };
    }, [handleInput]);

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
                } else if (guessIndex === 5) {
                    setMessage(`Oops! Better Luck Next Time. The word was ${todaysWord.toUpperCase()}`)
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

    function hasChar(char: string, idx: number) {
        if (idx < guessIndex) {
            return todaysWord.includes(char)
        }
        return false
    }

    function sameChar(char: string, i: number, idx: number) {
        if (idx < guessIndex && todaysWord) {
            return todaysWord[i] === char
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
            setMessage(`Oops! Better Luck Next Time. The word was ${todaysWord.toUpperCase()}`)
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
        sameChar
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