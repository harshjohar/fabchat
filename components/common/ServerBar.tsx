import {
    addDoc,
    collection,
    doc,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSlice";
import { db } from "../../serverless/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { Server } from "../../typings/Server";
import { useRouter } from "next/router";
import { ServerDp } from "./UserDp";
import Image from "next/image";

function ServerBar() {
    const user = useSelector(selectUser);
    const [servers] = useCollection(
        query(
            collection(db, "servers"),
            where("members", "array-contains", user.uid)
        )
    );
    const router = useRouter();
    const addServer = () => {
        const serverName = prompt("Enter server name");
        if (!serverName) return;
        addDoc(collection(db, "servers"), {
            name: serverName,
            description: "",
            community: false,
            owner: user.uid,
            photo: null,
            members: [user.uid],
        })
            .then((serverDoc) => {
                alert("server added");
                addDoc(collection(db, "servers", serverDoc.id, "channels"), {
                    name: "general",
                    description: "as the name suggests..",
                    type: "text",
                }).then((channelDoc) => {
                    setDoc(
                        doc(db, "servers", serverDoc.id),
                        {
                            activeChannel: channelDoc.id,
                        },
                        { merge: true }
                    );
                });
            })
            .catch(() => {
                alert("Internal Server Error");
            });
    };
    const navigate = () => {
        router.push(`/channels/@me`);
    };
    return (
        <div className="h-full w-full bg-fabchat-hoverBackground py-3 space-y-3">
            <div
                className="h-[3.5rem] w-[3.5rem] rounded-full hover:rounded-xl cursor-pointer mx-auto"
                onClick={navigate}
            >
                <img
                    src="/images/fabchat.png"
                    alt={"fabchat"}
                    className="h-full w-full object-cover rounded-full hover:rounded-xl cursor-pointer"
                />
            </div>
            <div className="w-[69%] h-[1.5px] bg-gray-200 mx-auto" />
            {servers?.docs.map((server, i) => {
                const serverData = server.data();
                const props = {
                    id: server.id,
                    name: serverData["name"] as String,
                    community: serverData["community"] as boolean,
                    description: serverData["description"] as String,
                    members: serverData["members"] as [String],
                    owner: serverData["owner"] as String,
                    photo: serverData["photo"] as String,
                    activeChannel: serverData["activeChannel"] as String,
                };
                return <ServerIcon serverData={props as Server} key={i} />;
            })}
            <div
                onClick={addServer}
                className="bg-blue-400 h-[3.5rem] w-[3.5rem] rounded-full hover:rounded-xl cursor-pointer mx-auto flex items-center justify-center font-semibold text-xl"
            >
                +
            </div>
        </div>
    );
}

export default ServerBar;

function ServerIcon({ serverData }: { serverData: Server }) {
    const router = useRouter();
    const navigate = () => {
        router.push(`/channels/${serverData.id}/${serverData.activeChannel}`);
    };
    return (
        <div
            className="h-[3.5rem] w-[3.5rem] rounded-full hover:rounded-xl cursor-pointer mx-auto"
            onClick={navigate}
        >
            {serverData.photo ? (
                <Image
                    src={serverData.photo as string}
                    alt={serverData.name as string}
                    height={60}
                    width={60}
                    className="h-full w-full object-cover rounded-full hover:rounded-xl cursor-pointer"
                />
            ) : (
                <ServerDp name={serverData.name} />
            )}
        </div>
    );
}
