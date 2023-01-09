import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const users = new Map();

export default class Connection {
  constructor(
    private io: Server,
    private socket: Socket<
      DefaultEventsMap,
      DefaultEventsMap,
      DefaultEventsMap,
      any
    >,
  ) {
    this.socket = socket;
    this.io = io;
    this.io.emit('users', users.size);
    users.set(this.socket.id, this.socket);

    socket.on('connect', () => this.connect());

    socket.on('check_online', (cb) => cb());

    socket.on('machine_address', (cb) => cb(global.machineKeyPair.address));

    // socket.use((packet, next) => {
    //     if (packet[0] === 'machine_address') return next();
    //     next(new Error('erdfdfdror'));
    // });

    socket.on('disconnect', () => this.disconnect());

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  connect() {
    users.set(this.socket.id, this.socket);
  }

  disconnect() {
    users.delete(this.socket.id);
  }
}
