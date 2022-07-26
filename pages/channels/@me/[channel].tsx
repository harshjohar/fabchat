import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function Channel() {
    const router = useRouter();
    const title = router.query["channel"];
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <p>{title}</p>
        </div>
    );
}

export default Channel;
