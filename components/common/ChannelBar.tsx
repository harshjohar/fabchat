import { addDoc, collection, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../serverless/firebase";
import { Channel } from "../../typings/Channel";
import { GiSpeaker } from "react-icons/gi";
import UserBar from "./UserBar";

function ChannelBar() {
    const router = useRouter();
    const [server, setServer] = useState("");
    useEffect(() => {
        if (!router.isReady) return;
        setServer(router.query["server"] as string);
    }, [router.isReady, router.query["server"], router.query["channel"]]
    );

    const [serverDoc] = useDocument(doc(db, "servers", server || "a"));
    const [channelDocs] = useCollection(
        collection(db, "servers", server || "a", "channels")
    );
    const channels = channelDocs?.docs;

    const addChannel = () => {
        const name = prompt("Enter name of channel");
        addDoc(collection(db, "servers", server || "a", "channels"), {
            name,
            type: "text",
            description: "",
        }).then(() => {
            alert("Channel created");
        });
    };

    const openSettings = () => {
        router.push(`/channels/${server}/settings`)
    }
    return (
        <div className="h-full w-full bg-pink-500 relative">
            <p className="px-3 py-4 shadow-xl font-bold cursor-pointer hover:bg-pink-600 relative" onClick={openSettings}>
                {serverDoc?.data()?.["name"] as string}
                <span
                    onClick={addChannel}
                    className="absolute right-4 text-2xl my-auto top-3 hover:text-white"
                >
                    +
                </span>
            </p>
            <div className="mt-3 px-3 space-y-2">
                {channels?.map((channel) => {
                    const data = channel.data();
                    const props = {
                        name: data["name"],
                        type: data["type"],
                        description: data["description"],
                        id: channel.id,
                    };
                    return <ChannelIcon channel={props} key={props.id} />;
                })}
            </div>

            <UserBar />
        </div>
    );
}

export default ChannelBar;

function ChannelIcon({ channel }: { channel: Channel }) {
    const router = useRouter();
    const [server, setServer] = useState("");
    useEffect(() => {
        if (!router.isReady) return;
        // codes using router.query
        setServer(router.query["server"] as string);
    }, [router.isReady]);

    const toggleChannel = () => {
        router.push(`/channels/${server}/${channel.id}`);
    };
    return (
        <div
            className="cursor-pointer hover:bg-pink-400 rounded-lg px-2 py-1"
            onClick={toggleChannel}
        >
            <div className="text-base">
                {channel.type === "text" ? (
                    <p className="fomt-semibold flex items-center">
                        <span className="mr-4 font-bold text-lg">#</span>
                        {channel.name}
                    </p>
                ) : (
                    <GiSpeaker />
                )}
            </div>
        </div>
    );
}
