"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv/config");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const routes_1 = (0, tslib_1.__importDefault)(require("./routes"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const Socket_1 = (0, tslib_1.__importDefault)(require("./modules/Socket"));
const commonFunctions_1 = require("./util/commonFunctions");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({
    limit: '5mb',
    extended: true
}));
app.use(express_1.default.json({
    limit: '5mb'
}));
app.use((0, cors_1.default)());
app.use('/api', routes_1.default);
(0, commonFunctions_1.getMachineKeyPair)().then((pair) => {
    global.machineKeyPair = pair;
    (0, commonFunctions_1.getDIDDocument)(pair);
});
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    path: '/sockets',
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
(0, Socket_1.default)(io);
httpServer.listen(process.env.PORT, () => {
    console.log('App  is running on port: ', process.env.PORT);
});
//# sourceMappingURL=server.js.map