import CharBoard from "./charBoard";
import GuessBoard from "./guessBoard";
import MessageBox from "./messageBox";
import { TdleProvider } from "./tdleContext";

export default function Tdle() {
    return <TdleProvider>
        <div className="flex-col h-screen w-screen md:flex">
            <h1 className="text-5xl font-semibold p-2 text-center">Tdle</h1>
            <GuessBoard></GuessBoard>
            <MessageBox></MessageBox>
            <CharBoard></CharBoard>
        </div>
    </TdleProvider>
}