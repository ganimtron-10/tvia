'use client'

import { PureComponent, useEffect } from "react";
import CharRow from "./charRow"
import { useTdleContext } from "./tdleContext"

export default function GuessBoard() {

    const { guesses, handleInput } = useTdleContext();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            handleInput(event.key.toLowerCase());
        };

        window.addEventListener('keyup', handleKeyDown);

        return () => {
            window.removeEventListener('keyup', handleKeyDown);
        };
    }, []);

    return <div className="p-5 mx-auto">
        {guesses.map((guess, i) => {
            return <CharRow key={i} guessWord={guess} idx={i}></CharRow>
        })}
    </div>
}