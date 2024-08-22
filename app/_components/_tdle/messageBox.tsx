'use client'

import RewardButton from "./rewardButton";
import { useTdleContext } from "./tdleContext";

export default function MessageBox() {

    const { message, showRewardBtn } = useTdleContext();

    return <div className="min-h-24 p-5 text-lg text-center mx-auto">
        <div>
            {message}
        </div>
        {showRewardBtn ? <RewardButton /> : <></>}
    </div>
}