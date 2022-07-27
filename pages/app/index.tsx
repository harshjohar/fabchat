import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";
import { auth, db } from "../../serverless/firebase";

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
            setDoc(
                doc(db, "users", user.uid),
                {
                    email: user.email,
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    lastSeen: serverTimestamp(),
                },
                {
                    merge: true,
                }
            ).then(()=>{
                router.push("channels/@me");
            });
        }
        else {
            router.push('/login')
        }
    }, [user]);
    return (
        <div className="h-screen w-screen grid place-items-center">
            <Head>
                <title>Fabchat</title>
            </Head>
            <div className="h-2/3 w-1/3 bg-blue-400 shadow-xl rounded-xl grid place-items-center">
                <img src="/images/Fabchat.png" className="h-1/2 w-1/2 object-cover rounded-full" />
            </div>
        </div>
    );
}

export default Loading;
