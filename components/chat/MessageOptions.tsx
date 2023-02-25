import {BiReply} from "react-icons/bi";
import {IconButton, Tooltip} from "@mui/material";
import React from "react";

export const MessageOptions = (
    {id, name, setReplyMessage}: {
        id: string,
        name: string,
        setReplyMessage: React.Dispatch<React.SetStateAction<{id: string, name: string} | null>>
    }
) => {
    const options = [
        {
            title: "Reply",
            icon: <BiReply color="white" />,
            onClick: () => {
                setReplyMessage({
                    id: id,
                    name: name
                })
            }
        }
    ]
    return (
        <div className="scale-90 z-10 shadow-lg bg-fabchat-hoverBackground rounded-[10px] absolute top-0 right-1">
            {
                options.map((option) => {
                    return (
                        <Tooltip title={option.title} placement="top">
                            <IconButton onClick={option.onClick}>
                                {option.icon}
                            </IconButton>
                        </Tooltip>
                    )
                })
            }
        </div>
    )
}