import Head from "next/head";
import React from "react";
import { userToRedux } from "../../utils/functions";

function Loading() {
    userToRedux();
    return (
        <div className="h-screen w-screen grid place-items-center">
            <Head>
                <title>Fabchat</title>
            </Head>
            <div className="h-2/3 w-1/3 bg-blue-400 shadow-xl rounded-xl grid place-items-center">
                <img
                    src="/images/Fabchat.png"
                    className="h-1/2 w-1/2 object-cover rounded-full"
                />
            </div>
        </div>
    );
}

export default Loading;
