import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { NextSeo } from 'next-seo';
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { db, storage } from "../../../serverless/firebase";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { useDocument } from "react-firebase-hooks/firestore";
import Members from "../../../components/chat/Members";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user/userSlice";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import UserDp from "../../../components/common/UserDp";

function settings() {
    const router = useRouter();
    const [server, setServer] = useState("");
    const [page, setPage] = useState("overview");
    const [serverName, setServerName] = useState("");

    const user = useSelector(selectUser);

    const [serverDoc] = useDocument(doc(db, "servers", server || "a"));
    const serverData = serverDoc?.data();

    useEffect(() => {
        if (!router.isReady) return;
        setServer(router.query["server"] as string);
    }, [router.isReady, router.query["server"]]);

    useEffect(() => {
        if (serverData) {
            setServerName(serverData["name"]);
        }
    }, []);

    const deleteServer = () => {
        const sure = confirm("Are you sure?");
        if (sure && server) {
            router.push("/channels/@me");
            deleteDoc(doc(db, "servers", server)).then(() => {
                alert("Server Deleted!");
            });
        }
    };

    const [emailId, setEmailId] = useState("");
    const inviteToServer = async (e: any) => {
        e.preventDefault();
        const colRef = collection(db, "invites");

        const check = await getDocs(
            query(collection(db, "users"), where("email", "==", emailId))
        );
        if (check.docs.length === 0) {
            alert("Please Enter a valid user!");
            return;
        }

        if (emailId.length > 0) {
            addDoc(colRef, {
                emailId,
                server,
            })
                .then(() => {
                    alert("Invite sent!")
                    setEmailId("");
                })
                .catch((err) => console.log(err));
        }
    };

    const fileRef = useRef<HTMLInputElement>(null);
    const [imageToPost, setImageToPost] = useState<any>(null);

    const [serverImage, setServerImage] = useState(serverData?.["photo"]);
    useEffect(() => {
        setServerImage(serverData?.["photo"]);
    }, [serverData?.["photo"]]);

    const addImageToFile = (e: any) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target?.result);
        };
    };

    const editServer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (serverName.length < 1 && !imageToPost) return;
        const img = imageToPost;

        if (serverName.length < 1) {
            if (imageToPost) {
                const storageRef = ref(storage, `servers/${serverDoc?.id}`);
                uploadString(storageRef, img, "data_url").then(() => {
                    getDownloadURL(
                        ref(storage, `servers/${serverDoc?.id}`)
                    ).then((url) => {
                        setDoc(
                            doc(db, "servers", server || "a"),
                            {
                                photo: url,
                            },
                            { merge: true }
                        )
                            .then(() => alert("updated!"))
                            .catch(() => alert("error occured"));
                    });
                });
            }
            return;
        }
        setDoc(
            doc(db, "servers", server || "a"),
            {
                name: serverName,
            },
            {
                merge: true,
            }
        )
            .then(() => {
                if (imageToPost) {
                    const storageRef = ref(storage, `servers/${serverDoc?.id}`);
                    uploadString(storageRef, img, "data_url").then(() => {
                        getDownloadURL(
                            ref(storage, `servers/${serverDoc?.id}`)
                        ).then((url) => {
                            setDoc(
                                doc(db, "servers", server || "a"),
                                {
                                    photo: url,
                                },
                                { merge: true }
                            );
                        });
                    });
                }
            })
            .then(() => alert("updated!"))
            .catch(() => alert("error occured"));
    };

    if (user.uid !== serverData?.["owner"]) {
        return (
            <div className="h-screen w-screen overflow-hidden flex bg-fabchat-background justify-end relative">
                <NextSeo
                    title={`${serverData?.["name"]}`}
                />
                <div
                    className="absolute top-16 right-16 cursor-pointer text-3xl"
                    onClick={() =>
                        router.push(
                            `/channels/${serverDoc?.id}/${serverData?.activeChannel}`
                        )
                    }
                >
                    <AiFillCloseCircle className="text-fabchat-primary hover:text-white" />
                </div>
                <div className="relative w-1/3 bg-fabchat-hoverBackground mt-32 flex flex-col space-y-4 items-end px-4 py-4">
                    <div
                        onClick={() => setPage("overview")}
                        className="bg-fabchat-primary text-right px-20 py-2 w-2/3 text-lg cursor-pointer rounded-lg hover:bg-blue-500 text-fabchat-text"
                    >
                        Overview
                    </div>
                    <div
                        onClick={() => setPage("members")}
                        className="bg-fabchat-primary text-right px-20 py-2 w-2/3 text-lg cursor-pointer rounded-lg hover:bg-blue-500 text-fabchat-text"
                    >
                        Members
                    </div>
                </div>
                <div className="w-2/3 bg-fabchat-hoverPrimary mt-32">
                    {page === "overview" ? (
                        <div className="text-3xl text-amber-200 text-center py-10">
                            Contact Server Owner for this
                        </div>
                    ) : (
                        <div className="">
                            <Members />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const removeImage = () => {
        setImageToPost(null);
    };

    return (
        <div className="h-screen w-screen overflow-hidden flex bg-fabchat-background justify-end relative">
            <NextSeo
                    title={`${serverData?.["name"]}`}
                />
            <div
                className="absolute top-16 right-16 cursor-pointer text-3xl"
                onClick={() =>
                    router.push(
                        `/channels/${serverDoc?.id}/${serverData?.activeChannel}`
                    )
                }
            >
                <AiFillCloseCircle className="text-fabchat-primary hover:text-white" />
            </div>
            <div className="relative w-1/3 bg-fabchat-hoverBackground mt-32 flex flex-col space-y-4 items-end px-4 py-4">
                <div
                    onClick={() => setPage("overview")}
                    className="bg-fabchat-primary text-right px-20 py-2 w-2/3 text-lg cursor-pointer rounded-lg hover:bg-blue-500"
                >
                    Overview
                </div>
                <div
                    onClick={() => setPage("members")}
                    className="bg-fabchat-primary text-right px-20 py-2 w-2/3 text-lg cursor-pointer rounded-lg hover:bg-blue-500"
                >
                    Members
                </div>
                <div
                    onClick={deleteServer}
                    className="absolute bottom-10 bg-fabchat-hoverPrimary text-right px-20 py-2 w-2/3 text-lg cursor-pointer rounded-lg hover:bg-red-500 flex justify-end space-x-3"
                >
                    <MdDelete className="text-2xl" />
                    <span>Delete Server</span>
                </div>
            </div>

            <input type="file" hidden onChange={addImageToFile} ref={fileRef} />

            <div className="w-2/3 bg-fachat-hoverPrimary mt-32">
                {page === "overview" ? (
                    <div className=" flex h-screen w-[80%] flex-col space-y-4 overflow-scroll scrollbar-hide pt-5 text-black pl-10">
                        <h1 className="text-md md:text-lg lg:text-2xl text-fabchat-text">
                            Server Overview
                        </h1>
                        <form className="w-full" onSubmit={editServer}>
                            <div className="flex w-full space-x-6">
                                {imageToPost ? (
                                    <div className="relative h-32 w-32">
                                        <span className="absolute top-0 right-0 text-4xl text-pink-400">
                                            <AiOutlineClose
                                                onClick={removeImage}
                                                className="cursor-pointer text-white"
                                            />
                                        </span>
                                        <img
                                            src={imageToPost}
                                            alt="img"
                                            className="w-full h-full object-cover cursor-pointer hover:opacity-70 rounded-full "
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="w-32 h-32 relative"
                                        onClick={() =>
                                            fileRef
                                                ? fileRef.current?.click()
                                                : console.log("first")
                                        }
                                    >
                                        {serverImage ? (
                                            <img
                                                src={serverImage}
                                                alt={serverData?.["name"]}
                                                className="w-full h-full object-cover cursor-pointer hover:opacity-70 rounded-full "
                                            />
                                        ) : (
                                            <UserDp
                                                name={serverData?.["name"]}
                                            />
                                        )}
                                    </div>
                                )}
                                <div className="w-full">
                                    <div className="text-fabchat-white">
                                        Server Name
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={serverData["name"]}
                                        value={serverName}
                                        onChange={(e) =>
                                            setServerName(e.target.value)
                                        }
                                        className="bg-fabchat-hoverPrimary w-full outline-none rounded-lg px-3 py-2"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="ml-auto mr-5 mt-2 px-4 py-1 rounded-xl bg-blue-400 cursor-pointer"
                            >
                                Submit
                            </button>
                        </form>
                        <h1 className="text-md md:text-lg lg:text-2xl text-fabchat-subtext">
                            Invite a new Member
                        </h1>
                        <form className="w-full">
                            <input
                                type="email"
                                value={emailId}
                                placeholder="Enter email of the user"
                                onChange={(e) => setEmailId(e.target.value)}
                                className="w-[90%] bg-fabchat-hoverPrimary p-3 md:w-full outline-none rounded-xl"
                            />
                            <button
                                type="submit"
                                onClick={inviteToServer}
                                className="hidden"
                            >
                                Invite!
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="">
                        <Members />
                    </div>
                )}
            </div>
        </div>
    );
}

export default settings;
