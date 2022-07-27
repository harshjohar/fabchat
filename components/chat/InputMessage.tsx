import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../serverless/firebase";

function InputMessage({ channelName }: { channelName: string }) {
    const [message, setMessage] = useState("");
    const router = useRouter();
    const server = router.query["server"] as string;
    const channel = router.query["channel"] as string;
    useEffect(() => {
        setMessage("");
    }, [server, channel]);

    const [user] = useAuthState(auth);
    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.length < 1) return;
        const msg = message;
        setMessage("");
        addDoc(
            collection(db, "servers", server, "channels", channel, "messages"),
            {
                message: msg,
                user: user?.uid,
                timestamp: serverTimestamp(),
                displayName: user?.displayName,
                photoURL: user?.photoURL,
                image: "",
            }
        ).catch(() => alert("error occured"));
    };
    return (
        <div className="w-full bg-pink-400 absolute bottom-5 flex justify-center">
            <form className="w-full" onSubmit={(e) => sendMessage(e)}>
                <input
                    type="text"
                    className="w-4/5 mx-[50%] -translate-x-[50%] outline-none rounded-lg bg-pink-600 px-2 py-1 text-white placeholder:text-white"
                    placeholder={`Message #${channelName}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="hidden">
                    Send
                </button>
            </form>
        </div>
    );
}

export default InputMessage;
