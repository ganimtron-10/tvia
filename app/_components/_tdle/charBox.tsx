interface CharBoxProps {
    character: string
    isAtCorrectPos: boolean
    isCorrectChar: boolean
}

export default function CharBox(props: CharBoxProps) {
    const { character, isAtCorrectPos, isCorrectChar } = props
    const bgColor = isAtCorrectPos ? "bg-green-500" : isCorrectChar ? "bg-yellow-500" : "bg-stone-700";
    return <div className={`w-14 h-14 m-1 uppercase ${bgColor} font-bold rounded-lg flex items-center justify-center`} >
        {character}
    </div >
}