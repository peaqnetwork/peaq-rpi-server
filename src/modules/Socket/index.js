"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const connection_1 = (0, tslib_1.__importDefault)(require("./connection"));
function socket(io) {
    global.io = io;
    io.on('connection', (socket) => {
        console.log('a user connected');
        new connection_1.default(io, socket);
    });
}
exports.default = socket;
//# sourceMappingURL=index.js.map