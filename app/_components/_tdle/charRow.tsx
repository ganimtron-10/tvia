import CharBox from "./charBox"
import { useTdleContext } from "./tdleContext"

interface CharRowProps {
    guessWord: string
    idx: number
}

export default function CharRow(props: CharRowProps) {
    const { hasChar, sameChar } = useTdleContext()
    const { guessWord, idx } = props

    return <div className="grid grid-cols-5 gap-1">
        {Array(5).fill(0).map((_, i) => {
            return <CharBox key={i} character={guessWord[i]} isAtCorrectPos={sameChar(guessWord[i], i, idx)} isCorrectChar={hasChar(guessWord[i], idx)}></CharBox>
        })}
    </div>
}