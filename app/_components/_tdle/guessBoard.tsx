import CharRow from "./charRow"

export default function GuessBoard() {
    return <div className="p-5 mx-auto">
        {Array(6).fill(0).map((_, i) => {
            return <CharRow key={i}></CharRow>
        })}
    </div>
}