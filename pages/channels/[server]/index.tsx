import { NextSeo } from 'next-seo';
import { useRouter } from "next/router";
import React from "react";
import PageLayout from "../../../components/Layout/PageLayout";

function index() {
    const router = useRouter();
    const server = router.query["server"];
    return (
        <PageLayout>
            <div className="">
                <NextSeo
                    title={`${server}`}
                />
            </div>
        </PageLayout>
    );
}

export default index;
