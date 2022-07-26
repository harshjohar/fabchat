import { doc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import PageLayout from "../../../components/Layout/PageLayout";
import { selectUser } from "../../../redux/user/userSlice";
import { db } from "../../../serverless/firebase";
import { redirectToLogin } from "../../../utils/functions";
import { BiHelpCircle } from "react-icons/bi";
import InputMessage from "../../../components/chat/InputMessage";
import Messages from "../../../components/chat/Messages";

function Channel() {
    const user = useSelector(selectUser);
    const router = useRouter();
    useEffect(() => {
        if (!user.email) {
            redirectToLogin(router);
        }
    }, [user]);
    const server = router.query["server"] as string;
    const channel = router.query["channel"] as string;
    const [channelDoc] = useDocument(
        doc(db, "servers", server as string, "channels", channel as string)
    );
    const channelData = channelDoc?.data();
    console.log(channelData);
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
                    <InputMessage channelName={channelData?.['name']} />
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
                </div>
            </div>
        </PageLayout>
    );
}

export default Channel;
