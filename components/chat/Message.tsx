import React from "react";
interface message {
    message: string;
    timestamp: any;
    displayName: string;
    photoUrl: string;
    postImage: string;
}

export const Message = (props: message) => {
    return (
        <div className="flex hover:bg-discord-selectedOption">
            <div className="flex flex-col items-center justify-start p-2 cursor-pointer">
                {props.photoUrl ? (
                    <img
                        src={props.photoUrl}
                        alt="dp"
                        className="h-12 w-12 rounded-full"
                    />
                ) : (
                    <img
                        src={
                            "https://cdn.britannica.com/61/103761-050-0174C1D5/Angelina-Jolie-Hollywood.jpg?w=400&h=300&c=crop"
                        }
                        alt="dp"
                        className="h-12 w-12 rounded-full"
                    />
                )}
            </div>

            <div className="ml-3">
                <p className="text-md cursor-pointer font-semibold text-black">
                    {props.displayName}
                    <span className="ml-4 cursor-default text-xs font-normal text-gray-400 hover:no-underline">
                        {props.timestamp &&
                            new Date(
                                props.timestamp?.toDate()
                            ).toLocaleString()}
                    </span>
                </p>

                {props.postImage && (
                    <div>
                        <img
                            src={props.postImage}
                            alt="image"
                            className="w-52 cursor-pointer object-contain"
                        />
                    </div>
                )}

                <p className="text-gray-900">{props.message}</p>
            </div>
        </div>
    );
};
