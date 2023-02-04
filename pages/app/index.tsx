import { NextSeo } from 'next-seo';
import React from "react";
import { userToRedux } from "../../utils/functions";

function Loading() {
    userToRedux();
    return (
        <div className="h-screen w-screen grid place-items-center bg-fabchat-background">
            <NextSeo
                title="Fabchat"
            />
            <div className="h-2/3 w-1/3 bg-fabchat-hoverBackground shadow-xl rounded-xl grid place-items-center">
                <img
                    src="/images/fabchat.png"
                    className="h-52 w-52 object-cover rounded-full"
                />
                <div className="text-white font-bold text-3xl">Loading...</div>
            </div>
        </div>
    );
}

export default Loading;
