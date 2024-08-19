'use client'

import { useTdleContext } from "./tdleContext";

export default function MessageBox() {

    const { message } = useTdleContext();

    return <div className="min-h-24 p-5 text-lg text-center mx-auto">
        {message}
    </div>
}