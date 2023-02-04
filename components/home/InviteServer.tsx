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
import UserDp from "../common/UserDp";

interface inviteDoc {
    doc: QueryDocumentSnapshot<DocumentData>;
}
export const InviteServer = (props: inviteDoc) => {
    const invitation = props.doc.data();
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
            {serverImage ? <img
                src={serverImage}
                alt="hehe"
                className="rounded-full h-20 w-20 object-cover"
            /> : <UserDp name={serverName} />}
            <div>
                <div className="text-lg cursor-default font-bold">{serverName}</div>
                <div className="text-sm">{serverDesc}</div>
                <div className="space-x-3 mt-2">
                    <button
                        onClick={acceptInvite}
                        className="p-1 px-2 bg-fabchat-primary rounded-md cursor-pointer hover:shadow-green-500 hover:shadow-md"
                    >
                        Accept
                    </button>
                    <button
                        onClick={rejectInvite}
                        className="p-1 px-2 text-black bg-fabchat-hoverSecondary rounded-md cursor-pointer hover:shadow-red-500 hover:shadow-md"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};
