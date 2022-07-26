import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import { selectUser } from "../redux/user/userSlice";
import { useRouter } from "next/router";

function Fabchat({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default Fabchat;
