import { doc } from "firebase/firestore";
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
        <div className="flex cursor-pointer items-center pl-2 hover:bg-yellow-200 py-2">
            {user && (
                (user?.photoURL ? <img
                    src={user?.photoURL}
                    alt="dp"
                    className="h-10 w-10 rounded-full"
                /> : <UserDp name={user?.displayName} />)
            )}
            <p className="mx-3 text-black">{user?.displayName}</p>
        </div>
    );
};
