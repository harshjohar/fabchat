import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user/userSlice";
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
    return (
        <div>
            <Head>
                <title>{channel}</title>
            </Head>
        </div>
    );
}

export default Channel;
