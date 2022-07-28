import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import { auth, db } from "../serverless/firebase";

export const redirectToLogin = (router: NextRouter) => {
    router.push("/login");
};

export const userToRedux = () => {
    const dispatch = useDispatch();
    const [user] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            dispatch(
                setUser({
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                })
            );
            setDoc(
                doc(db, "users", user.uid),
                {
                    email: user.email,
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    lastSeen: serverTimestamp(),
                },
                {
                    merge: true,
                }
            ).then(() => {
                router.push("/channels/@me");
            });
        } else {
            router.push("/login");
        }
    }, [user]);
};

export const getRecipientEmail = (users: any, userLoggedIn: any) =>
    users?.filter(
        (userToFilter: any) => userToFilter !== userLoggedIn?.email
    )[0];
