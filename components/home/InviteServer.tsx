import {
    arrayUnion,
    deleteDoc,
    doc,
    DocumentData,
    QueryDocumentSnapshot,
    setDoc,
} from "firebase/firestore";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSlice";
import { db } from "../../serverless/firebase";

interface inviteDoc {
    doc: QueryDocumentSnapshot<DocumentData>;
}
export const InviteServer = (props: inviteDoc) => {
    const invitation = props.doc.data();
    console.log(invitation);
    const [serverInfo] = useDocument(doc(db, "servers", invitation.server));
    const serverName = serverInfo?.data()?.name;
    const serverDesc = serverInfo?.data()?.description;
    const serverImage = serverInfo?.data()?.photo;
    const serverId = serverInfo?.id;
    const user = useSelector(selectUser);

    const acceptInvite = () => {
        serverId &&
            setDoc(
                doc(db, "servers", serverId),
                {
                    members: arrayUnion(user?.uid),
                },
                { merge: true }
            ).then(() => {
                deleteDoc(doc(db, "invites", props.doc.id));
            });
    };
    const rejectInvite = () => {
        deleteDoc(doc(db, "invites", props.doc.id));
    };

    return (
        <div className="p-3 m-2 rounded-xl flex space-x-8">
            <img
                src={serverImage}
                alt=""
                className="rounded-full h-20 w-20 object-cover"
            />
            <div>
                <p className="text-lg cursor-default font-bold">{serverName}</p>
                <p className="text-sm">{serverDesc}</p>
                <div className="space-x-3 mt-2">
                    <button
                        onClick={acceptInvite}
                        className="p-1 bg-green-300 rounded-md cursor-pointer hover:bg-discord-green hover:text-discord-black"
                    >
                        Accept
                    </button>
                    <button
                        onClick={rejectInvite}
                        className="p-1 bg-red-200 rounded-md cursor-pointer hover:bg-discord-red"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};
