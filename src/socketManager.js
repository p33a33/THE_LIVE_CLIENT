import io from 'socket.io-client'
import { SERVER } from './pages/config'

class SocketManager {
    socket = null;

    constructor() {
        if (SocketManager.instance) {
            return SocketManager.instance
        }
        SocketManager.instance = this

        this.socket = io.connect(SERVER);
        this.setupListenDefaultEvents();
        return this
    }

    setupListenDefaultEvents() {
        this.socket.on('connect', () => console.log('socket connected'));
        this.socket.on('disconnect', () => console.log('socket disconnected'));
    }

    emitPrepareLiveStream({ title, body }) {
        this.socket.emit('prepare-broadcast', { title, body });
    }
}

const instance = new SocketManager();
export default SocketManager