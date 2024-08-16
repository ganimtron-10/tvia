import KeyChar from "./keyChar"

export default function CharBoard() {
    const qwerty = ['q,w,e,r,t,y,u,i,o,p', 'a,s,d,f,g,h,j,k,l', 'enter,z,x,c,v,b,n,m,clear']
    return <div>
        {qwerty.map((value, i) => {
            return <div key={i} className="max-w-screen-sm grid grid-flow-col mx-auto">
                {value.split(',').map((char, j) => {
                    return <KeyChar key={`${i}${j}`} character={char}></KeyChar>
                })}
            </div>
        })}
    </div>
}