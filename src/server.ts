import 'dotenv/config'

import express from 'express';
import cors from 'cors';

import routes from './routes';
import { Server } from 'socket.io';
import { createServer } from 'http';
import socket from './modules/Socket';
import { getDIDDocument, getMachineKeyPair } from './util/commonFunctions';
import { KeyringPair } from '@polkadot/keyring/types';
import {   peaqDidDocumentInterface,
} from './util/types';

declare global {
    var machineKeyPair: KeyringPair;
    var didDocument:   peaqDidDocumentInterface;

  }

const app = express();

app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}));

app.use(express.json({
    limit: '5mb'
}));

app.use(cors());
app.use('/api', routes);

getMachineKeyPair().then((pair) => {
    global.machineKeyPair = pair;
    getDIDDocument(pair);
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
    path: '/sockets',
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
socket(io);


httpServer.listen(process.env.PORT, () => {
    console.log('App  is running on port: ', process.env.PORT);
});