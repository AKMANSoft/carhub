import { useContext } from 'react'
import { SocketContext } from '../../lib/socketio'



export default function useSocketIO() {
    const socket = useContext(SocketContext);
    return socket;
}

