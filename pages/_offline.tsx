import { NextSeo } from 'next-seo';
import Lottie from "react-lottie-player";
import offline from "../public/animations/offline.json"

const Fallback = () => (
    <div className="h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
        <NextSeo
            title='Fabchat |  Connect to internet'  
            titleTemplate='%s |  Connect to internet'  
        />
        <div className="font-bold text-[30px]">You are offline</div>
        <Lottie
            loop
            animationData={offline}
            play
            style={{ width: 200, height: 200 }}
        />
        <div className="font-bold text-[26px]">Connect to the internet to continue</div>
    </div>
);

export default Fallback;