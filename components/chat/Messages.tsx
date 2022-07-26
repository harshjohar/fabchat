import { collection, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../serverless/firebase";
import { Message } from "./Message";

function Messages() {
    const router = useRouter();

    const server = router.query["server"] as string;
    const channel = router.query["channel"] as string;

    const endRef = useRef<HTMLDivElement>(null);

    const [messages] = useCollection(
        query(
            collection(db, "servers", server, "channels", channel, "messages"),
            orderBy("timestamp", "asc")
        )
    );
    useEffect(() => {
        endRef?.current?.scrollIntoView();
    }, [messages]);
    return (
        <div className="h-[80%] overflow-y-scroll scrollbar-hide bg-blue-100">
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
