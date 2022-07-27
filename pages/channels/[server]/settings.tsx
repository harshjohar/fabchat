import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { db } from "../../../serverless/firebase";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDocument } from "react-firebase-hooks/firestore";

function settings() {
    const router = useRouter();
    const [server, setServer] = useState("");
    const [serverDoc] = useDocument(doc(db, "servers", server || "a"));
    const serverData = serverDoc?.data();
    useEffect(() => {
        if (!router.isReady) return;
        setServer(router.query["server"] as string);
    }, [router.isReady, router.query["server"]]);

    const deleteServer = () => {
        const sure = confirm("Are you sure?");
        if (sure && server) {
            router.push("/channels/@me");
            deleteDoc(doc(db, "servers", server)).then(() => {
                alert("Server Deleted!");
            });
        }
    };
    return (
        <div className="h-screen w-screen overflow-hidden flex bg-yellow-100 justify-end relative">
            <div
                className="absolute top-16 right-16 cursor-pointer text-3xl hover:text-white"
                onClick={() =>
                    router.push(
                        `/channels/${serverDoc?.id}/${serverData?.activeChannel}`
                    )
                }
            >
                <AiFillCloseCircle />
            </div>
            <div className="relative w-1/3 bg-red-300 mt-32 flex flex-col space-y-4 items-end px-4 py-4">
                <p className="bg-blue-200 text-right px-20 py-2 w-2/3 text-lg cursor-pointer rounded-lg hover:bg-blue-500">
                    Overview
                </p>
                <p className="bg-blue-200 text-right px-20 py-2 w-2/3 text-lg cursor-pointer rounded-lg hover:bg-blue-500">
                    Members
                </p>
                <p
                    onClick={deleteServer}
                    className="absolute bottom-10 bg-orange-200 text-right px-20 py-2 w-2/3 text-lg cursor-pointer rounded-lg hover:bg-red-500 flex justify-end space-x-3"
                >
                    <MdDelete className="text-2xl" />
                    <span>Delete Server</span>
                </p>
            </div>
            <div className="w-2/3 bg-pink-800"></div>
        </div>
    );
}

export default settings;
