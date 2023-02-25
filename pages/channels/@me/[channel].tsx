import { doc } from "firebase/firestore";
import { NextSeo } from 'next-seo';
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import InputMessage from "../../../components/home/InputMessage";
import Messages from "../../../components/home/Messages";
import PageLayout from "../../../components/Layout/PageLayout";
import { selectUser } from "../../../redux/user/userSlice";
import { db } from "../../../serverless/firebase";
import { getRecipientEmail, redirectToLogin } from "../../../utils/functions";

function Channel() {
    const user = useSelector(selectUser);
    const router = useRouter();
    useEffect(() => {
        if (!user.email) {
            redirectToLogin(router);
        }
    }, [user]);
    const [channel, setChannel] = useState("");
    useEffect(() => {
        if (!router.isReady) return;
        setChannel(router.query["channel"] as string);
    }, [router.isReady, router.query["channel"]]);
    const docRef = doc(db, "directs", channel || "a");
    const [channelDoc] = useDocument(docRef);
    const channelData = channelDoc?.data();
    const [replyMessage, setReplyMessage] = useState<{id: string, name: string} | null>(null)

    return (
        <PageLayout>
            <div className="h-full w-full flex bg-fabchat-hoverBackground flex-col relative">
                <NextSeo
                    title={`${getRecipientEmail(channelData?.["users"], user)}`}
                />
                <div className="px-3 py-3 shadow-3xl space-x-2 font-semibold text-fabchat-text cursor-pointer flex items-center">
                    <span className="mr-2 text-2xl">@</span>
                    <span>
                        {getRecipientEmail(channelData?.["users"], user)}
                    </span>
                </div>
                <Messages setReplyMessage={setReplyMessage} />
                <InputMessage
                    channelName={getRecipientEmail(channelData?.["users"], user)}
                    replyMessage={replyMessage}
                    setReplyMessage={setReplyMessage}
                />
            </div>
        </PageLayout>
    );
}

export default Channel;
