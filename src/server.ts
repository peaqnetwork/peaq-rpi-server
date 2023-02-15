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
import { ApiPromise } from '@polkadot/api';

declare global {
    var machineKeyPair: KeyringPair;
    var didDocument:   peaqDidDocumentInterface;
    var networkApi: ApiPromise;
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
app.get('/', (_, res) => {
    res.send('PI Server is running');
});
app.use('/', routes);

getMachineKeyPair().then((pair) => {
    global.networkApi = null;
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