import React, { ReactNode } from "react";
import ChannelBar from "../common/ChannelBar";
import ServerBar from "../common/ServerBar";

function PageLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen w-screen overflow-hidden flex">
            <div className="h-full w-[5%]">
                <ServerBar />
            </div>
            <div className="h-full w-[20%]">
                <ChannelBar />
            </div>
            <div className="h-full w-[75%]">

            {children}
            </div>
        </div>
    );
}

export default PageLayout;
