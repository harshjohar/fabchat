import {
    addDoc,
    collection,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../../serverless/firebase";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {IconButton, TextareaAutosize, Tooltip} from "@mui/material";
import {CgClose} from "react-icons/cg";

function InputMessage(
    {
        channelName,
        replyMessage,
        setReplyMessage
    }: {
        channelName: string,
        replyMessage: {id: string, name: string} | null,
        setReplyMessage:  React.Dispatch<React.SetStateAction<{id: string, name: string} | null>>
    }
) {
    const [message, setMessage] = useState("");
    const router = useRouter();
    const [server, setServer] = useState("");
    const [channel, setChannel] = useState("");
    useEffect(() => {
        if (!router.isReady) return;
        // codes using router.query
        setServer(router.query["server"] as string);
        setChannel(router.query["channel"] as string);
    }, [router.isReady, router.query["server"], router.query["channel"]]);

    useEffect(() => {
        setMessage("");
        setImageToPost(null);
    }, [server, channel]);

    const fileRef = useRef<HTMLInputElement>(null);
    const [imageToPost, setImageToPost] = useState<any>(null);

    const [user] = useAuthState(auth);

    const sendMessage = () => {
        if (message.length < 1 && !imageToPost) return;
        const msg = message;
        setMessage("");
        const img = imageToPost;
        removeImage();
        const id = replyMessage ? replyMessage.id : null
        setReplyMessage(null)

        addDoc(
            collection(db, "servers", server, "channels", channel, "messages"),
            {
                message: msg,
                user: user?.uid,
                timestamp: serverTimestamp(),
                displayName: user?.displayName,
                photoURL: user?.photoURL,
                image: imageToPost ? "/images/dummy.jpeg" : "",
                replyTo: id
            }
        )
            .then((addedDoc) => {
                if (imageToPost) {
                    const storageRef = ref(storage, `messages/${addedDoc.id}`);
                    uploadString(storageRef, img, "data_url").then(() => {
                        getDownloadURL(
                            ref(storage, `messages/${addedDoc.id}`)
                        ).then((url) => {
                            setDoc(
                                addedDoc,
                                {
                                    image: url,
                                },
                                { merge: true }
                            );
                        });
                    });
                }
            })
            .catch(() => alert("error occured"));
    };

    const addImageToFile = (e: any) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target?.result);
        };
    };

    const removeImage = () => {
        setImageToPost(null);
    };
    return (
        <div className="absolute bottom-3 left-4 flex flex-col w-[90%] rounded-lg px-2 py-1 bg-fabchat-primary">
            {
                replyMessage && (
                    <div className="text-fabchat-text flex flex-row justify-between items-center">
                        <div>Reply to <b>{replyMessage.name}</b></div>
                        <Tooltip title="Remove reply" placement="top">
                            <IconButton onClick={() => setReplyMessage(null)}>
                                <CgClose color="white" />
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            }
            {imageToPost && (
                <div className="flex items-center space-x-4">
                    <AiOutlineClose
                        onClick={removeImage}
                        className="cursor-pointer text-white"
                    />
                    <img
                        src={imageToPost}
                        alt=""
                        className="w-72 object-contain"
                    />
                </div>
            )}

            <input type="file" hidden onChange={addImageToFile} ref={fileRef} />
            <div className="flex w-full space-x-2">
                <IoIosAddCircle
                    className="text-3xl cursor-pointer text-gray-400 hover:text-white"
                    onClick={() =>
                        fileRef
                            ? fileRef.current?.click()
                            : console.log("first")
                    }
                />
                <form
                    className="w-full"
                    onSubmit={(e) => {
                        e.preventDefault()
                        sendMessage()
                    }}
                >
                    <TextareaAutosize
                        className="resize-none w-[90%] outline-none rounded-lg bg-transparent px-2 py-1 text-white placeholder:text-white"
                        placeholder={`Message #${channelName||''}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if(!e.shiftKey && e.key == "Enter") {
                                e.preventDefault()
                                sendMessage()
                            }
                        }}
                        maxRows={6}
                    />
                    <button type="submit" className="hidden">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default InputMessage;
