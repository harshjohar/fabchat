import {Head, Html, Main, NextScript} from "next/document";

const Document = () => {
    return (
        <Html>
            <Head>
                <link rel="manifest" href="/manifest.json"/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;