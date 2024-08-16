import CharBox from "./charBox"

export default function CharRow() {
    return <div className="grid grid-cols-5 gap-1">
        {Array(5).fill(0).map((_, i) => {
            return <CharBox key={i} character="a" isAtCorrectPos={Math.random() > 0.5 ? true : false} isCorrectChar={Math.random() > 0.5 ? true : false}></CharBox>
        })}
    </div>
}