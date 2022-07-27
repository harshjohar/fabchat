import {
    addDoc,
    collection,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../../serverless/firebase";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function InputMessage({ channelName }: { channelName: string }) {
    const [message, setMessage] = useState("");
    const router = useRouter();
    const server = router.query["server"] as string;
    const channel = router.query["channel"] as string;
    useEffect(() => {
        setMessage("");
    }, [server, channel]);

    const fileRef = useRef<HTMLInputElement>(null);
    const [imageToPost, setImageToPost] = useState<any>(null);

    const [user] = useAuthState(auth);
    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.length < 1 || !imageToPost) return;
        const msg = message;
        setMessage("");
        const img = imageToPost;
        removeImage();

        addDoc(
            collection(db, "servers", server, "channels", channel, "messages"),
            {
                message: msg,
                user: user?.uid,
                timestamp: serverTimestamp(),
                displayName: user?.displayName,
                photoURL: user?.photoURL,
                image: imageToPost ? "/images/dummy.jpeg" : "",
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
        <div className="absolute bottom-1 left-4 flex flex-col w-[90%] rounded-lg bg-gray-500 px-2 py-1">
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
                <form className="w-full" onSubmit={(e) => sendMessage(e)}>
                    <input
                        type="text"
                        className="w-4/5 outline-none rounded-lg bg-transparent px-2 py-1 text-white placeholder:text-white"
                        placeholder={`Message #${channelName}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
