import { Server } from 'socket.io';
import Connection from './connection';

function socket(io: Server) {
  global.io = io;
  setInterval(() => {
    io.emit('server_online', global.machineKeyPair.address);
  }, 5000);
  io.on('connection', (socket) => {
    console.log('a user connected');
    
      new Connection(io, socket);
    
  });
}

export default socket;
