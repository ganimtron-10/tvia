import NavBar from "./navBar";
import CharBoard from "./charBoard";
import GuessBoard from "./guessBoard";
import MessageBox from "./messageBox";
import { TdleProvider } from "./tdleContext";

export default function Tdle() {
    return <TdleProvider>
        <div className="flex-col h-screen w-screen md:flex">
            <NavBar></NavBar>
            <GuessBoard></GuessBoard>
            <MessageBox></MessageBox>
            <CharBoard></CharBoard>
        </div>
    </TdleProvider>
}