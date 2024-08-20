'use client'

import { useEffect } from "react"
import { useTdleContext } from "./tdleContext"

interface CharBoxProps {
    character: string
    isAtCorrectPos?: boolean
    isCorrectChar?: boolean
}

export default function KeyChar(props: CharBoxProps) {
    const { handleInput } = useTdleContext();
    const { character, isAtCorrectPos, isCorrectChar } = props
    const bgColor = isAtCorrectPos ? "bg-green-500" : isCorrectChar ? "bg-yellow-500" : "bg-stone-700";
    return <button onClick={() => handleInput(character)} className={`min-w-6 min-h-14 p-1 m-1 uppercase ${bgColor} font-bold rounded-lg flex items-center justify-center`} >
        {character}
    </button >
}
