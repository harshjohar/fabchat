import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../serverless/firebase";
import { Member } from "./Member";

function Members() {
    const router = useRouter();
    const [server, setServer] = useState("");
    useEffect(() => {
        if (!router.isReady) return;

        // codes using router.query
        setServer(router.query["server"] as string)
    }, [router.isReady]);
    const [serverData] = useDocument(doc(db, "servers", server || "a"));
    const members = serverData?.data()?.members;

    return (
        <div>
            <p className="font-semibold py-2 px-1">Members - {members?.length}</p>
            {members?.map((member: any, i: number) => {
                return <Member key={i} memberId={member} />;
            })}
        </div>
    );
}

export default Members;