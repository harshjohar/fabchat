import {
    addDoc,
    collection,
    DocumentData,
    query,
    where,
} from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import { selectUser } from "../../redux/user/userSlice";
import { db } from "../../serverless/firebase";
import { BsPlus } from "react-icons/bs";
import { useRouter } from "next/router";
import { getRecipientEmail } from "../../utils/functions";

function FriendsList() {
    const user = useSelector(selectUser);
    const [directs] = useCollection(
        query(
            collection(db, "directs"),
            where("users", "array-contains", user.email)
        )
    );
    const dms = directs?.docs;

    const addDm = async () => {
        const emailId = prompt("Enter email of other user");
        if (!emailId) {
            return;
        }

        if (
            EmailValidator.validate(emailId) &&
            emailId !== user.email &&
            !chatAlreadyExists(emailId)
        ) {
            addDoc(collection(db, "directs"), {
                users: [user.email, emailId],
            });
        }
    };

    const chatAlreadyExists = (recipientEmail: String) =>
        !!directs?.docs.find(
            (chat) =>
                chat
                    .data()
                    .users.find((user: String) => user === recipientEmail)
                    ?.length > 0
        );
    return (
        <div className="h-full w-full flex flex-col">
            <div className="uppercase text-sm px-3 py-2 flex justify-between text-fabchat-subtext">
                Direct Messages{" "}
                <span className="cursor-pointer" onClick={addDm}>
                    <BsPlus size={20} />
                </span>
            </div>
            <div className="flex-1 space-y-2">
                {dms?.map((dm) => {
                    return <FriendChat key={dm.id} dm={dm.data()} id={dm.id} />;
                })}
            </div>
        </div>
    );
}

export default FriendsList;

const FriendChat = ({ dm, id }: { dm: DocumentData; id: String }) => {
    const user = useSelector(selectUser);
    const router = useRouter();
    const toggle = () => {
        router.push(`/channels/@me/${id}`);
    };
    return (
        <div className="text-fabchat-text px-3 py-2 bg-fabchat-hoverBackground rounded-lg cursor-pointer" onClick={toggle}>
            {getRecipientEmail(dm["users"], user)}
        </div>
    );
};
