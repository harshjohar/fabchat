import Head from 'next/head';
import Lottie from "react-lottie-player";
import offline from "../public/animations/offline.json"

const Fallback = () => (
    <div className="h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
        <Head>
            <title>Fabchat |  Connect to internet</title>
        </Head>
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