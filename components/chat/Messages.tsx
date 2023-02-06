import { collection, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../serverless/firebase";
// import { Loader } from "../Loader";
import { Message } from "./Message";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Messages() {
    const router = useRouter();
    const [loader,setLoader]=useState(false);
    const [server, setServer] = useState("");
    const [channel, setChannel] = useState("");
    useEffect(() => {
        if (!router.isReady) return;
        // codes using router.query
        setServer(router.query["server"] as string);
        setChannel(router.query["channel"] as string);
    }, [router.isReady, router.query["server"], router.query["channel"]]);

    const endRef = useRef<HTMLDivElement>(null);
    const colRef = collection(
        db,
        "servers",
        server || "a",
        "channels",
        channel || "b",
        "messages"
    );

    const [messages,loading,error] = useCollection(
        query(colRef, orderBy("timestamp", "asc"))
    );
    console.log(loading);
  
    useEffect(() => {
        endRef?.current?.scrollIntoView();
    }, [messages,!loading]);
    return (
          <div className="h-[82%] overflow-y-scroll scrollbar-hide bg-fabchat-hoverBackground space-y-2">
        {loading ?
     
        <SkeletonTheme baseColor="grey" highlightColor="white">
            <div className="flex">
                <div className="m-5">
        <Skeleton circle={true} height={50} width={50}></Skeleton>
        </div>
        <div className="flex-col">
            <div className="m-5">
        <Skeleton count={1} height={20} width={50} />
        </div>
        <div className="m-5">
        <Skeleton height={50} width={500}></Skeleton>
        </div>
        </div>
        </div>
       
        <br></br>
        <div className="flex">
                <div className="m-5">
        <Skeleton circle={true} height={50} width={50}></Skeleton>
        </div>
        <div className="flex-col">
            <div className="m-5">
        <Skeleton count={1} height={20} width={50} />
        </div>
        <div className="m-5">
        <Skeleton height={200} width={500}></Skeleton>
        </div>
        </div>
        </div>
        <br></br>
        <div className="flex mb-5">
                <div className="m-5">
        <Skeleton circle={true} height={50} width={50}></Skeleton>
        </div>
        <div className="flex-col">
            <div className="m-5">
        <Skeleton count={1} height={20} width={50} />
        </div>
        <div className="m-5">
        <Skeleton height={50} width={500}></Skeleton>
        </div>
        </div>
        </div>
        </SkeletonTheme>
     
        : 
        <>
        {messages?.docs?.map((doc) => {
            const { message, timestamp, displayName, photoURL, image } =
                doc.data();
            return (
                <Message
                    key={doc.id}
                    message={message}
                    timestamp={timestamp}
                    displayName={displayName}
                    photoUrl={photoURL}
                    postImage={image}
                />
            );
        })}
        <div ref={endRef} />
      </>}
       
    </div>
    );
}

export default Messages;
