import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckDouble, faClock, faImage, faMagnifyingGlass, faPaperPlane, faPaperclip, faPlus } from "@fortawesome/free-solid-svg-icons";
import useSocketIO from "../components/hooks/useSocketIO";
import { blobToBase64, cn, formatDateTimeForMsg } from "../lib/utils";
import { SOCKET_EV_ACKNOWLEDGEMENT, SOCKET_EV_JOIN, SOCKET_EV_RECEIVE_MESSAGE, SOCKET_EV_SEEN, SOCKET_EV_SEND_MESSAGE } from "../lib/socketio";
import LoaderEl from "../components/loader";
import axios from "axios";
import { apiConfig } from "../config/api";
import ChatPageCarsSliderPopup from "../popups/ChatPageCarsSliderPopup";
import { handleTranslation } from "../lib/i18n";


export default function MessagesPage({ authUser }) {
    const { trans } = handleTranslation()
    const [chatsList, setChatsList] = React.useState([])
    const [selectedChat, setSelectedChat] = React.useState(null);


    React.useEffect(async () => {
        try {
            const res = await axios.post(
                apiConfig.basePath + apiConfig.endpoints.getChatsList,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + authUser.accessToken,
                        "Content-Type": "multipart/form-data"
                    }
                });
            setChatsList(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }, [])


    const setMessagesSeen = (newChat) => {
        axios.post(
            apiConfig.basePath + apiConfig.endpoints.seenAllMessages,
            {
                user_id: newChat?.chatProfile.id,
            },
            {
                headers: {
                    "Authorization": "Bearer " + authUser.accessToken
                }
            }
        ).then((res) => {
            if (res.data.success === true) {
                setChatsList(chatsList.map((chat) => {
                    if (chat.id === newChat?.id) {
                        return {
                            ...chat,
                            unseen_message_count: 0,
                        }
                    }
                    return chat;
                }))
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const onSelectedChatChange = (newChat) => {
        if (newChat?.unseen_message_count > 0) {
            setMessagesSeen(newChat)
        }
        setSelectedChat(newChat)
    }


    return (
        <div className="flex w-full border-t-2 overflow-hidden h-[700px] max-h-full border-gray-200">
            {/* Chats Sidebar */}
            <ChatSidebar
                userProfile={authUser.userProfile}
                chatsList={chatsList}
                setSelectedChat={onSelectedChatChange}
                selectedChat={selectedChat}
            />

            {/* Messages Section  */}
            {
                selectedChat ?
                    <MessagesSection
                        authUser={authUser}
                        setMessagesSeen={setMessagesSeen}
                        onMessageReceived={(newChat) => {
                            if (!newChat) return;
                            setChatsList(
                                chatsList.map((chat) => {
                                    if (chat.id === newChat.id) {
                                        return {
                                            ...chat,
                                            last_message: newChat.last_message,
                                            unseen_message_count: 0,
                                        }
                                    }
                                    return chat
                                })
                            )
                        }}
                        selectedChat={selectedChat}
                        onBackPressed={() => setSelectedChat(null)} />
                    :
                    <div className="hidden lg:flex items-center justify-center w-full h-96">
                        <h5 className="text-base text-gray-700">
                            {trans("no_chat")}
                        </h5>
                    </div>
            }
        </div>
        // </div>
    );
}



function MessagesSection({
    authUser, selectedChat,
    onBackPressed, onMessageReceived,
    setMessagesSeen
}) {
    const { trans } = handleTranslation();
    const [messageText, setMessageText] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const [isLoading, setIsloading] = React.useState(false);
    const messagesContainerRef = React.useRef(null);
    const fileInputRef = React.useRef(null);
    const socket = useSocketIO();


    React.useEffect(async () => {
        setMessages([])
        setIsloading(true);
        try {
            const res = await axios.post(
                apiConfig.basePath + apiConfig.endpoints.getChatMessages,
                {
                    user_id: selectedChat.chatProfile.id,
                    car_id: selectedChat.car_id
                },
                {
                    headers: {
                        Authorization: "Bearer " + authUser.accessToken,
                        "Content-Type": "multipart/form-data"
                    }
                });
            setMessages(res.data.data)
            setTimeout(() => {
                messagesContainerRef?.current?.scrollTo({
                    top: messagesContainerRef?.current?.scrollHeight,
                })
            }, 10)
        } catch (error) {
            console.log(error);
            // setMessages(null)
        }
        setIsloading(false)
    }, [selectedChat])

    React.useEffect(() => {
        setTimeout(() => {
            messagesContainerRef?.current?.scrollTo({
                top: messagesContainerRef?.current?.scrollHeight,
                behavior: "smooth"
            })
        }, 15)

        // if (messages?.find((msg) => msg?.state === "sending")) {
        //     setTimeout(() => {
        //         setMessages(messages.map((msg) => ({ ...msg, state: "" })))
        //     }, 2000)
        // }
    }, [messages]);



    React.useEffect(() => {
        socket.emit(SOCKET_EV_JOIN, `${selectedChat.sender_id}${selectedChat.receiver_id}`);
        socket.on(SOCKET_EV_ACKNOWLEDGEMENT, () => {
            console.log("Socket io ack event");
        })
        socket.on(SOCKET_EV_RECEIVE_MESSAGE, (chat) => {
            setMessages((prevMessages) => [...prevMessages, chat.last_message]);
            onMessageReceived(chat);
            setMessageSeen(chat.last_message.id)
        })
        socket.emit(SOCKET_EV_SEEN, {
            "message_id": selectedChat?.last_message?.id,
            "sender_id": selectedChat?.sender_id,
            "receiver_id": selectedChat?.receiver_id
        })
        socket.on("disconnect", () => {
            console.log("Socket Disconnected.")
        })
        return () => {
            socket.off(SOCKET_EV_ACKNOWLEDGEMENT);
            socket.off(SOCKET_EV_RECEIVE_MESSAGE);
        };
    }, [socket]);


    console.log(socket.connected)



    const sendMessage = async (message) => {
        socket.emit(
            SOCKET_EV_SEND_MESSAGE,
            message
        )
    }


    const setMessageSeen = (messageId) => {
        if (!selectedChat) return;
        socket.emit(SOCKET_EV_SEEN, {
            sender_id: selectedChat.sender_id,
            receiver_id: selectedChat.receiver_id,
            message_id: messageId,
        })
    }



    const handleSendMessage = () => {
        if (messageText === "" || !messages) return;
        const senderId = authUser.userProfile.id;
        const receiverId = selectedChat.chatProfile.id
        const message = {
            "car_id": selectedChat.car_id,
            "sent_by": senderId,
            "receiver_id": receiverId,
            "chatId": senderId + "" + receiverId,
            "type": "text",
            "is_seen": "0",
            "message": messageText,
            "sender_id": senderId
        }
        sendMessage(message);
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                id: Math.round((new Date()).getTime() * Math.random()),
                ...message,
                created_at: (new Date()).toUTCString()
            }
        ])
        setMessageText("");
    }
    const sendImageMessage = async (imageBlob) => {
        const senderId = authUser.userProfile.id;
        const receiverId = selectedChat.chatProfile.id
        const message = {
            "car_id": selectedChat.car_id,
            "sent_by": senderId,
            "receiver_id": receiverId,
            "chatId": `${senderId}${receiverId}`,
            "type": "file",
            "file_type": "image",
            "file": window.URL.createObjectURL(imageBlob),
            "is_seen": "0",
            "message": "",
            "sender_id": senderId
        }
        blobToBase64(imageBlob).then((imageB64) => {
            let formatedB64Data = imageB64.replace(/^data:image\/[^;]+;base64,/, "");
            sendMessage({
                ...message,
                file: formatedB64Data,
            })
        })
        // setMessages((prevMessages) => [
        //     ...(prevMessages.map((msg) => ({ ...msg, state: "" }))),
        //     {
        //         id: Math.round((new Date()).getTime() * Math.random()),
        //         ...message,
        //         state: "sending",
        //         created_at: (new Date()).toUTCString()
        //     }
        // ])
    }




    const onFilesChange = (e) => {
        const images = e.target.files;
        if (images.length <= 0) return;
        if (!messages) {
            return;
        }
        const imageBlob = images[0];
        sendImageMessage(imageBlob)
    }

    return (
        <div className={cn(
            "w-full flex-col relative bg-gray-100 h-full max-h-full",
            selectedChat ? "flex" : "hidden lg:flex"
        )}>
            <ChatHeader
                chat={selectedChat}
                onBackPressed={onBackPressed} />
            {
                // error ?
                //     <div className="flex items-center justify-center w-full h-full">
                //         <p>Got some issue loading messages. <br /> Try refreshing page.</p>
                //     </div>
                //     :
                isLoading || !messages ?
                    <LoaderEl containerClassName="h-full" />
                    :
                    <div ref={messagesContainerRef} className="max-h-full h-full overflow-y-auto">
                        <div className="p-4 space-y-4">
                            {
                                messages
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                                    .map((message) => (
                                        <MessageItem
                                            key={message?.id}
                                            message={message}
                                            primary={message.sent_by === authUser.userProfile.id} />
                                    ))
                            }
                        </div>
                    </div>
            }
            {/* Chat Footer  */}
            <div className="bg-white h-20">
                <div className="flex items-center bg-transparent rounded-full border border-gray-200 m-5 px-2 py-1">
                    <input type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={onFilesChange} />
                    <button type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-base aspect-square px-3 rounded-full bg-gray-50 text-gray-800 transition-all hover:bg-gray-200">
                        <FontAwesomeIcon icon={faPaperclip} />
                    </button>
                    <input type="text"
                        className="no-decor bg-transparent w-full text-gray-600"
                        placeholder={trans("type...")}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)} />
                    <button type="button"
                        onClick={handleSendMessage}
                        disabled={messageText === ""}
                        className="text-base aspect-square px-3 rounded-full bg-primary text-white transition-all hover:bg-primary/90">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </div>
    )
}



function ChatSidebar({ userProfile, chatsList, setSelectedChat, selectedChat = null, }) {
    const { trans } = handleTranslation()
    const [filterTerm, setFilterTerm] = React.useState("");
    const [filteredChatList, setFilteredChatList] = React.useState(chatsList ?? []);


    React.useEffect(() => {
        if (chatsList) {
            setFilteredChatList(
                chatsList
                    .map((chat) => {
                        const chatProfile = chat.sender_id === userProfile.id ? chat.receiver_detail : chat.sender_detail;
                        return {
                            ...chat,
                            chatProfile: chatProfile
                        }
                    })
                    .filter((chat) => {
                        return chat.chatProfile.name.toLowerCase().includes(filterTerm.toLowerCase())
                    })
            )
        }
    }, [chatsList, filterTerm])

    return (
        <div className={cn(
            "md:min-w-[400px] w-full lg:max-w-[400px] flex-col border-r-2 border-gray-200",
            selectedChat ? "hidden lg:flex" : "flex"
        )}>
            <div className="flex items-center bg-transparent rounded-full border border-gray-200 m-4 px-2 py-1">
                <input type="text"
                    className="no-decor bg-transparent w-full text-gray-600"
                    placeholder={trans("search...")}
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)} />
                {/* <button type="button"
                    disabled={filterTerm === ""}
                    // onClick={doFilterChatList}
                    className="text-base aspect-square px-3 rounded-full bg-transparent text-gray-600"> */}
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400 px-3" />
                {/* </button> */}
            </div>
            <div className="max-h-full overflow-y-auto divide-y divide-y-gray-100/90">
                {
                    filteredChatList.map((chatItem) => (
                        <ChatItem
                            key={chatItem.id}
                            chat={chatItem}
                            selected={chatItem.id === selectedChat?.id}
                            onClick={() => setSelectedChat(chatItem)} />
                    ))
                }
            </div>
        </div>
    )
}


function ChatHeader({ onBackPressed, chat, className }) {
    return (
        <div className={cn(
            "bg-white flex items-center justify-between border-b last:border-none border-gray-100/90 py-4 gap-5 px-4",
            className
        )}>
            <div className="flex items-center gap-2 md:gap-5">
                <button type='button' onClick={onBackPressed} className='lg:hidden text-gray-800 text-xl rounded-full py-1 px-3 aspect-square bg-transparent transition-all hover:bg-gray-200'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div>
                    <img src={chat?.chatProfile?.image} width={50} height={50} className="min-w-[50px] aspect-square rounded-full border-2 border-gray-200" alt="" />
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                        {chat.chatProfile.name}
                    </h4>
                    {/* <p className="text-sm text-gray-600 font-normal line-clamp-1">
                    {chat.last_message.message}
                </p> */}
                </div>
            </div>
            <div>
                <ChatPageCarsSliderPopup images={chat.cars_images} />
            </div>
        </div>
    );
}




function MessageItem({ message, primary = true }) {
    return (
        <div className={"flex " + (primary ? "justify-end" : "justify-start")}>
            <div className="max-w-[80%] md:max-w-[400px]">
                {
                    message.type === "file" ?
                        message.file_type === "image" &&
                        <img src={message?.file} alt=""
                            width={350} height={220}
                            loading="lazy"
                            className={cn(
                                "rounded-3xl w-[300px] h-[250px] object-cover object-center",
                                primary ? "bg-primary rounded-br-none" : "bg-white rounded-bl-none"
                            )}
                            style={{
                                backgroundImage: primary ? "url(/images/spinner-light.svg)" : "url(/images/spinner-dark.svg)",
                                backgroundSize: "40%",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }} />
                        :
                        <div className={cn(
                            "rounded-3xl py-3 px-4",
                            primary ? "bg-primary rounded-br-none" : "bg-white rounded-bl-none"
                        )}>
                            <p className={"text-sm font-light " + (primary ? "text-white" : "text-gray-900")}>
                                {message.message}
                            </p>
                        </div>
                }
                <div className={cn(
                    "flex items-center gap-2",
                    primary ? "justify-end" : "justify-start"
                )}>
                    <span className={cn(
                        "text-xs text-gray-600 font-normal block min-w-max px-1 mt-1",
                    )}>
                        {formatDateTimeForMsg(new Date(message.created_at))}
                    </span>
                    {
                        primary && message?.state === "sending" &&
                        <FontAwesomeIcon icon={faClock} className="text-gray-600 text-xs" />
                    }
                    {
                        primary && message?.is_seen === "1" &&
                        <FontAwesomeIcon icon={faCheckDouble} className="text-primary text-xs" />
                    }
                </div>
            </div>
        </div>
    );
}

function ChatItem({ onClick, chat, selected }) {
    return (
        <div onClick={onClick} className={cn(
            "flex w-full items-center cursor-pointer gap-5 py-3 px-4 transition-all",
            selected ? "bg-gray-100" : "hover:bg-gray-50"
        )}>
            <div>
                <img src={chat?.chatProfile?.image} width={50} height={50} className="min-w-[50px] aspect-square rounded-full border-2 border-gray-200" alt="" />
            </div>
            <div className="w-full">
                <div className="flex items-center justify-between gap-5">
                    <h4 className="text-base font-semibold text-gray-900 line-clamp-1">
                        {chat?.chatProfile?.name}
                    </h4>
                    {
                        chat.unseen_message_count > 0 &&
                        <span className="flex items-center justify-center min-w-max rounded-full py-[2px] px-2 bg-primary text-white text-xs">
                            {chat?.unseen_message_count}
                        </span>
                    }
                </div>

                <div className="w-full flex items-center justify-between">
                    <p className="text-sm text-gray-600 font-normal line-clamp-1 gap-5">
                        {
                            chat?.last_message?.type === "file" ?
                                chat?.last_message?.file_type === "image" &&
                                <span>
                                    <FontAwesomeIcon icon={faImage} className="text-xs mr-2" />
                                    Image
                                </span>
                                :
                                <span>{chat?.last_message?.message}</span>
                        }
                    </p>
                    <span className="text-sm text-gray-600 font-normal block min-w-max px-3">
                        {formatDateTimeForMsg(new Date(chat.last_message.created_at))}
                    </span>
                </div>
            </div>
        </div>
    );
}