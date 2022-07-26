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

function Channel() {
    const user = useSelector(selectUser);
    const router = useRouter();
    useEffect(() => {
        if (!user.email) {
            redirectToLogin(router);
        }
    }, [user]);
    const server = router.query["server"];
    const channel = router.query["channel"];

    const [channelDoc] = useDocument(
        doc(db, "servers", server as string, "channels", channel as string)
    );
    const channelData = channelDoc?.data();
    return (
        <PageLayout>
            <div className="h-full w-full">
                <Head>
                    <title>
                        {channelData ? channelData["name"] : "Discord"}
                    </title>
                </Head>
            </div>
        </PageLayout>
    );
}

export default Channel;
