import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import PageLayout from "../../../components/Layout/PageLayout";

function index() {
    const router = useRouter();
    const server = router.query["server"];
    return (
        <PageLayout>
            <div>
                <Head>
                    <title>{server}</title>
                </Head>
            </div>
        </PageLayout>
    );
}

export default index;
