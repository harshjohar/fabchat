import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSlice";
import { db } from "../../serverless/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { Server } from "../../typings/Server";
import { useRouter } from "next/router";

function ServerBar() {
    const user = useSelector(selectUser);
    const [servers] = useCollection(collection(db, "servers"));
    const addServer = () => {
        const serverName = prompt("Enter server name");
        if (!serverName) return;
        addDoc(collection(db, "servers"), {
            name: serverName,
            description: "",
            community: false,
            owner: user.uid,
            photo: "https://cdn.britannica.com/61/103761-050-0174C1D5/Angelina-Jolie-Hollywood.jpg?w=400&h=300&c=crop",
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
    return (
        <div className="h-full w-full bg-blue-300 py-3 space-y-3">
            {servers?.docs.map((server) => {
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
                return <ServerIcon serverData={props as Server} />;
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
            <img
                src={serverData.photo as string}
                alt={serverData.name as string}
                className="h-full w-full object-cover rounded-full hover:rounded-xl cursor-pointer"
            />
        </div>
    );
}
