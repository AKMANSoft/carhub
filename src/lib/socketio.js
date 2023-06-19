import IO from 'socket.io-client'
import { apiConfig } from '../config/api';


export const socket = IO(apiConfig.socketPath, {
    rejectUnauthorized: false,
    transports: ["websocket"]
});

