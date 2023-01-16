"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
exports.users = new Map();
class Connection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.socket = socket;
        this.io = io;
        this.io.emit('users', exports.users.size);
        exports.users.set(this.socket.id, this.socket);
        socket.on('connect', () => this.connect());
        socket.on('check_online', (cb) => cb());
        socket.on('machine_address', (cb) => cb(global.machineKeyPair.address));
        socket.on('disconnect', () => this.disconnect());
        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }
    connect() {
        exports.users.set(this.socket.id, this.socket);
    }
    disconnect() {
        exports.users.delete(this.socket.id);
    }
}
exports.default = Connection;
//# sourceMappingURL=connection.js.map