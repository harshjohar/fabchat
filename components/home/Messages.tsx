import { collection, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../serverless/firebase";
import { Message } from "../chat/Message";

function Messages() {
    const router = useRouter();
    const [channel, setChannel] = useState("");
    useEffect(() => {
        if (!router.isReady) return;
        setChannel(router.query["channel"] as string);
    }, [router.isReady, router.query["server"], router.query["channel"]]);

    const endRef = useRef<HTMLDivElement>(null);
    const colRef = collection(db, "directs", channel || "a", "messages");
    const [messages] = useCollection(
        query(colRef, orderBy("timestamp", "asc"))
    );
    useEffect(() => {
        endRef?.current?.scrollIntoView();
    }, [messages]);
    return (
        <div className="h-[82%] overflow-y-scroll scrollbar-hide bg-fabchat-hoverBackground space-y-2">
          
            {messages?.docs?.map((doc) => {
                const { message, timestamp, displayName, photoURL, image } =
                    doc.data();
                return (
                    <Message
                        key={doc.id}
                        message={message}
                        timestamp={timestamp}
                        displayName={displayName}
                        photoUrl={photoURL}
                        postImage={image}
                    />
                );
            })}
            <div ref={endRef} />
        </div>
    );
}

export default Messages;
