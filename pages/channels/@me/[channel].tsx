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
    const title = router.query["channel"];
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <p>{title}</p>
        </div>
    );
}

export default Channel;
