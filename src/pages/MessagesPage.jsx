import React from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";


export default function MessagesPage() {
    const [selectedChat, setSelectedChat] = React.useState(null);
    return (
        // <div className={"py-10 md:py-20" + MAIN_HORIZONTAL_PADDING}>
        //     <div className="mb-12">
        //         <h2 className="text-4xl text-gray-900 font-bold">
        //             <a href="/" className="text-gray-400">Home</a>
        //             <i className="mx-4 text-[70%] text-gray-500 fa-solid fa-chevron-right"></i>
        //             <a href="/notifications">Messages</a>
        //         </h2>
        //     </div>
        <div className="flex w-full border-t-2 overflow-hidden max-h-[90vh] lg:max-h-[800px] border-gray-200">
            {/* Chats Sidebar */}
            <div className={"min-w-[400px] w-full lg:max-w-[400px] border-r-2 border-gray-200 " + (selectedChat !== null && window.innerWidth < 1020 ? "hidden" : "")}>
                <div className="flex items-center bg-transparent rounded-full border border-gray-200 m-5 px-2 py-1">
                    <input type="text" className="no-decor bg-transparent w-full text-gray-600" placeholder="Search..." />
                    <button type="button" className="text-base aspect-square px-3 rounded-full bg-primary text-white">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div className="max-h-full overflow-y-auto">
                    <ChatItem onClick={() => setSelectedChat("hello")} />
                    <ChatItem onClick={() => setSelectedChat("hello")} />
                    <ChatItem onClick={() => setSelectedChat("hello")} />
                    <ChatItem onClick={() => setSelectedChat("hello")} />
                    <ChatItem onClick={() => setSelectedChat("hello")} />
                    <ChatItem onClick={() => setSelectedChat("hello")} />
                    <ChatItem onClick={() => setSelectedChat("hello")} />
                    <ChatItem onClick={() => setSelectedChat("hello")} />
                    <ChatItem onClick={() => setSelectedChat("hello")} />
                    <ChatItem onClick={() => setSelectedChat("hello")} />
                    <ChatItem onClick={() => setSelectedChat("hello")} />
                </div>
            </div>
            {/* Messages Section  */}
            <div className={"w-full lg:flex flex-col bg-gray-100 " + (selectedChat === null ? "hidden" : "flex")}>
                <ChatHeader onBackPressed={() => setSelectedChat(null)} />
                <div className="max-h-full h-full min-h-[60vh] lg:min-h-0 overflow-y-auto p-4 space-y-4 flex flex-col justify-end">
                    <MessageItem />
                    <MessageItem primary={false} />
                    <MessageItem />
                    <MessageItem primary={false} />
                </div>
                <div className="bg-white">
                    <div className="flex items-center bg-transparent rounded-full border border-gray-200 m-5 px-2 py-1">
                        <input type="text" className="no-decor bg-transparent w-full text-gray-600" placeholder="Type..." />
                        <button type="button" className="text-base aspect-square px-3 rounded-full bg-primary text-white transition-all hover:bg-primary/90">
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    );
}


function ChatHeader({ onBackPressed }) {
    return (
        <div className="bg-white flex items-center border-b last:border-none border-gray-100/90 gap-5 py-4 px-4">
            <button type='button' onClick={onBackPressed} className='lg:hidden text-gray-800 text-xl rounded-full py-1 px-3 aspect-square bg-transparent transition-all hover:bg-gray-200'>
                <i className='fa-solid fa-arrow-left'></i>
            </button>
            <div>
                <img src="/images/car1.jpg" width={60} height={60} className="min-w-[60px] aspect-square rounded-full border-2 border-gray-200" alt="" />
            </div>
            <div>
                <h4 className="text-base font-semibold text-gray-900">
                    Chat Title
                </h4>
                <p className="text-sm text-gray-600 font-normal line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, itaque.
                </p>
            </div>
        </div>
    );
}

function MessageItem({ primary = true }) {
    return (
        <div className={"flex " + (primary ? "justify-end" : "justify-start")}>
            <div className={"rounded-3xl py-3 px-4 max-w-[400px] " + (primary ? "bg-primary rounded-br-none" : "bg-white rounded-bl-none")}>
                <p className={"text-sm font-light " + (primary ? "text-white" : "text-gray-900")}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque nisi excepturi necessitatibus sit maxime. Dicta quo laboriosam iusto, voluptates veritatis quos rerum sint inventore necessitatibus, dolorem illo reprehenderit optio eligendi.
                </p>
            </div>
        </div>
    );
}

function ChatItem({ onClick }) {
    return (
        <div onClick={onClick} className="flex items-center border-b border-gray-100/90 cursor-pointer gap-5 py-4 px-4 transition-all bg-transparent hover:bg-gray-50">
            <div>
                <img src="/images/car1.jpg" width={60} height={60} className="min-w-[60px] aspect-square rounded-full border-2 border-gray-200" alt="" />
            </div>
            <div bo>
                <h4 className="text-base font-semibold text-gray-900">
                    Chat Title
                </h4>
                <p className="text-sm text-gray-600 font-normal line-clamp-2 lg:line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, itaque.
                </p>
            </div>
        </div>
    );
}