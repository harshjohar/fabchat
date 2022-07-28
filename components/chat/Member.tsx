import { doc } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../serverless/firebase";
import UserDp from "../common/UserDp";

interface MemberProp {
    memberId: string;
}
export const Member = (props: MemberProp) => {
    const memberId = props.memberId;
    const [data] = useDocument(doc(db, "users", memberId));
    const user = data?.data();

    return (
        <div className="flex cursor-pointer items-center pl-2 hover:bg-fabchat-hoverBackground py-2">
            {user &&
                (user?.photoURL ? (
                    <Image
                        height={40}
                        width={40}
                        src={user?.photoURL}
                        alt="dp"
                        className="h-10 w-10 rounded-full"
                    />
                ) : (
                    <UserDp name={user?.displayName} />
                ))}
            <p className="mx-3 text-fabchat-text">{user?.displayName}</p>
        </div>
    );
};
