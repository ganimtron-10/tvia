import CharBoard from "./charBoard";
import GuessBoard from "./guessBoard";

export default function Tdle() {
    return <div className="flex-col h-screen w-screen md:flex">
        <h1 className="text-5xl font-semibold p-2 text-center">Tdle</h1>
        <GuessBoard></GuessBoard>
        <CharBoard></CharBoard>
    </div>
}