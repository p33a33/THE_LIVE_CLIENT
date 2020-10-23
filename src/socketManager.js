import io from 'socket.io-client'
import { SERVER } from './pages/config'

// const EVENT_JOIN_ROOM = 'join-room'
// const EVENT_LEAVE_ROOM = "leave-room";
// const EVENT_LIST_LIVE_STREAM = "list-broadcast";
// const EVENT_BEGIN_LIVE_STREAM = "begin-broadcast";
// const EVENT_FINISH_LIVE_STREAM = "done-broadcast";
// const EVENT_SEND_HEART = "send-heart";
// const EVENT_SEND_MESSAGE = "send-message";
// const EVENT_PREPARE_LIVE_STREAM = "prepare-broadcast";
// const EVENT_SEND_REPLAY = "replay";

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
        this.socket.emit("prepare-broadcast", { title, body });
    }
}

const instance = new SocketManager();
export default SocketManager