import { doc } from "firebase/firestore";
import { NextSeo } from 'next-seo';
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import PageLayout from "../../../../components/Layout/PageLayout";
import { selectUser } from "../../../../redux/user/userSlice";
import { db } from "../../../../serverless/firebase";
import { redirectToLogin } from "../../../../utils/functions";
import { BiHelpCircle } from "react-icons/bi";
import InputMessage from "../../../../components/chat/InputMessage";
import Messages from "../../../../components/chat/Messages";
import Members from "../../../../components/chat/Members";
// import { Loader } from "../../../../components/Loader";
function Channel() {
    const user = useSelector(selectUser);
    const router = useRouter();
    const [server, setServer] = useState("");
    const [channel, setChannel] = useState("");
    const [replyMessage, setReplyMessage] = useState<{id: string, name: string} | null>(null)
    useEffect(() => {
        if (!router.isReady) return;
        setServer(router.query["server"] as string);
        setChannel(router.query["channel"] as string);
    }, [router.isReady, router.query["server"], router.query["channel"]]);
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
                <NextSeo
                    title={`${channelData ? channelData["name"] : "Discord"}`}
                />
                  

                <div className="bg-fabchat-hoverBackground h-full w-3/4 relative">
                    <div className="px-3 py-3 shadow-3xl font-semibold text-fabchat-text cursor-pointer flex items-center">
                        <span className="mr-2 text-2xl">#</span>
                        {channelData?.["name"]}
                    </div>
                    <Messages
                        setReplyMessage={setReplyMessage}
                    />

                    <InputMessage
                        channelName={channelData?.["name"]}
                        replyMessage={replyMessage}
                        setReplyMessage={setReplyMessage}
                    />
                </div>
                    
                <div className="bg-fabchat-background w-1/4">
                    <div className="justify-between px-3 py-3 shadow-xl font-semibold text-blue-900 cursor-pointer flex items-center">
                        <input
                            type="text"
                            className="outline-none h-full w-3/4 text-sm bg-fabchat-primary rounded-lg placeholder:text-sm px-2 py-2"
                            placeholder="Search"
                        />
                        <BiHelpCircle size={20} className="text-fabchat-subtext" />
                    </div>
                    <Members />
                </div>
            </div>
        </PageLayout>
    );
}

export default Channel;
