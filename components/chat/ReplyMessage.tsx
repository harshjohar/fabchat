import {useDocumentData} from "react-firebase-hooks/firestore";
import {db} from "../../serverless/firebase";
import {doc} from "firebase/firestore";
import React from "react";
import {BsImage} from "react-icons/bs";

interface Message {
    message: string;
    displayName: string;
    photoURL: string;
    image: string;
    replyTo: string | null;
}
export const ReplyMessage = ({path}: {path: string}) => {
    // @ts-ignore
    const [message] = useDocumentData<Message>(doc(db, path))

    return (
        <div>
            {
                message && (
                    <div className="flex flex-row text-fabchat-text text-sm items-center">
                        <img
                            src={message.photoURL}
                            alt="dp"
                            className="h-8 w-8 rounded-full"
                        />
                        <b className="px-1">{message.displayName}</b>
                        <a
                            className="flex-1 flex flex-row items-center overflow-hidden px-1 hover:underline h-full flex-1 overflow-hidden text-ellipsis"
                            href={`#${path}`}
                        >
                            {
                                message.message.length > 0 ? (
                                    <>
                                        <div>
                                            {message.message.slice(0, 100)}{message.message.length > 100 && "..."}
                                        </div>
                                        {
                                            message.image.length > 0 && (
                                                <BsImage className="ml-1" />
                                            )
                                        }
                                    </>
                                ) : message.image.length > 0 && (
                                    <div className="flex flex-row items-center">
                                        <span>Click to see attachment</span>
                                        <BsImage className="ml-1" />
                                    </div>
                                )
                            }
                        </a>
                    </div>
                )
            }
        </div>
    )
}