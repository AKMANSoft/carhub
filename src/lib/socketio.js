import IO from 'socket.io-client'
import { apiConfig } from '../config/api';
import React from 'react';


export const SOCKET_EV_SEEN = "seen"
export const SOCKET_EV_SEND_MESSAGE = "sendMessage"
export const SOCKET_EV_JOIN = "sendMessage"

export const socket = IO(apiConfig.socketPath, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 30,
    // rejectUnauthorized: false,
    transports: ["websocket"],
});

export const SocketContext = React.createContext()


const CAR_ID = "2044901"
const SENDER_ID = "300"
const RECEIVER_ID = "296"
const message = {
    "car_id": "2044865",
    "sent_by": SENDER_ID,
    "receiver_id": RECEIVER_ID,
    "chatId": RECEIVER_ID + SENDER_ID,
    "type": "text",
    "is_seen": "0",
    "message": "hello test",
    "sender_id": SENDER_ID
}

export function connectSocket() {


}

