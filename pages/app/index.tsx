import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";
import { auth } from "../../serverless/firebase";

function Loading() {
    const dispatch = useDispatch();
    const [user] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            dispatch(
                setUser({
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                })
            );
            router.push("channels/@me")
        }
    }, [user]);
    return (
        <div>
            <Head>
                <title>Fabchat</title>
            </Head>
        </div>
    );
}

export default Loading;
