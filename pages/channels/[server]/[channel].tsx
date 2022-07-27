import { doc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import PageLayout from "../../../components/Layout/PageLayout";
import { selectUser } from "../../../redux/user/userSlice";
import { db } from "../../../serverless/firebase";
import { redirectToLogin } from "../../../utils/functions";
import { BiHelpCircle } from "react-icons/bi";
import InputMessage from "../../../components/chat/InputMessage";
import Messages from "../../../components/chat/Messages";
import Members from "../../../components/chat/Members";

function Channel() {
    const user = useSelector(selectUser);
    const router = useRouter();
    const [server, setServer] = useState("");
    const [channel, setChannel] = useState("");
    useEffect(() => {
        if (!router.isReady) return;
        setServer(router.query["server"] as string);
        setChannel(router.query["channel"] as string);
    }, [router.isReady]);

    useEffect(() => {
        if (!user.email) {
            redirectToLogin(router);
        }
    }, [user]);
    const docRef = doc(
        db,
        "servers",
        server as string || "a",
        "channels",
        channel as string || "b"
    );
    const [channelDoc] = useDocument(docRef);
    const channelData = channelDoc?.data();
    return (
        <PageLayout>
            <div className="h-full w-full flex">
                <Head>
                    <title>
                        {channelData ? channelData["name"] : "Discord"}
                    </title>
                </Head>

                <div className="bg-red-400 h-full w-3/4 relative">
                    <p className="px-3 py-3 shadow-xl font-semibold text-blue-900 cursor-pointer flex items-center">
                        <span className="mr-2 text-2xl">#</span>
                        {channelData?.["name"]}
                    </p>
                    <Messages />
                    <InputMessage channelName={channelData?.["name"]} />
                </div>
                <div className="bg-yellow-300 w-1/4">
                    <div className="justify-between px-3 py-3 shadow-xl font-semibold text-blue-900 cursor-pointer flex items-center">
                        <input
                            type="text"
                            className="outline-none h-full w-3/4 text-sm bg-yellow-400 rounded-lg placeholder:text-sm px-2 py-2"
                            placeholder="Search"
                        />
                        <BiHelpCircle size={20} />
                    </div>
                    <Members />
                </div>
            </div>
        </PageLayout>
    );
}

export default Channel;
