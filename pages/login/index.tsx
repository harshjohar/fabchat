import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { auth, provider } from "../../serverless/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { NextSeo } from 'next-seo';

function Login() {
    const signIn = () => {
        signInWithPopup(auth, provider);
    };

    const [user] = useAuthState(auth);

    const router = useRouter();

    useEffect(() => {
        if (user) router.push("/app");
        return () => {};
    }, [user]);

    return (
        <div className="h-screen w-screen bg-fabchat-background grid place-items-center">
            <NextSeo
                title="Fabchat"
            />
            <div className="h-[40%] w-[40%] rounded-xl bg-fabchat-hoverPrimary p-4 flex flex-col items-center justify-evenly">
                <div>
                    <h1 className="text-4xl text-center font-serif text-fabchat-text">
                        Welcome to Fabchat
                    </h1>
                    <h2 className="text-center text-white font-mono">
                        We are so excited to see you!
                    </h2>
                </div>
                <div className="w-full flex justify-center">
                    <button
                        onClick={signIn}
                        className="mx-auto bg-fabchat-primary hover:bg-fabchat-hoverBackground rounded-full px-12 py-4 text-white font-extrabold"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
