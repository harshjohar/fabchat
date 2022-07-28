import React from "react";

function UserDp({ name }: { name?: string }) {
    return (
        <div className="h-12 w-12 rounded-full bg-fabchat-primary flex items-center justify-center">
            {name ? name[0] : "X"}
        </div>
    );
}

export function ServerDp({ name }: { name?: String }) {
    return (
        <div className={`h-full w-full object-cover rounded-full hover:rounded-xl cursor-pointer bg-gray-400 flex items-center justify-center`}>
            {name ? name[0] : "X"}
        </div>
    );
}

export default UserDp;
