'use client'

import CharRow from "./charRow"
import { useTdleContext } from "./tdleContext"

export default function GuessBoard() {

    const { guesses } = useTdleContext();

    return <div className="p-5 mx-auto">
        {guesses.map((guess, i) => {
            return <CharRow key={i} guessWord={guess} idx={i}></CharRow>
        })}
    </div>
}