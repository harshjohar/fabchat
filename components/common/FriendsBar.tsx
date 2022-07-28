import { useRouter } from "next/router";
import React from "react";
import { HiUsers } from "react-icons/hi";
import FriendsList from "../home/FriendsList";

function FriendsBar() {
    const router = useRouter();
    return (
        <div className="h-full w-full bg-fabchat-background flex flex-col items-center py-6 px-2">
            <div className="w-full space-y-4 flex flex-col">
                {/* <input
                    type="text"
                    className="w-[4/5] outline-none bg-fabchat-primary px-3 py-2 rounded-lg text-fabchat-white placeholder:text-fabchat-white"
                    placeholder="Search"
                /> */}
                <div className="w-full bg-fabchat-hoverBackground text-fabchat-text flex items-center space-x-4 px-4 py-3 rounded-lg cursor-pointer" onClick={()=>router.push('/channels/@me')}>
                    <HiUsers />
                    <span>Friends</span>
                </div>
            </div>
            <div className="w-full flex-1 overflow-y-scroll scrollbar-hide">
                <FriendsList />
            </div>
        </div>
    );
}

export default FriendsBar;
