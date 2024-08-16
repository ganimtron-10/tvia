interface CharBoxProps {
    character: string
    isAtCorrectPos?: boolean
    isCorrectChar?: boolean
}

export default function keyChar(props: CharBoxProps) {
    const { character, isAtCorrectPos, isCorrectChar } = props
    const bgColor = isCorrectChar ? "bg-yellow-500" : isAtCorrectPos ? "bg-green-500" : "bg-stone-700";
    return <button className={`min-w-6 min-h-14 p-1 m-1 uppercase ${bgColor} font-bold rounded-lg flex items-center justify-center`} >
        {character}
    </button >
}
