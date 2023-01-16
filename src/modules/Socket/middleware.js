"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAuth = void 0;
const util_crypto_1 = require("@polkadot/util-crypto");
const socketAuth = (socket, next) => {
    const { token } = socket.handshake.auth;
    if (token) {
        const [signature, message] = token.split('::');
        if (!signature || !message)
            return next(new Error('authentication error'));
        const controllerAddress = global.didDocument.controller.split(':')[2];
        const isValid = (0, util_crypto_1.signatureVerify)(message, signature, controllerAddress);
        if (!isValid)
            return next(new Error('authentication error'));
        return next();
    }
    return next(new Error('authentication error'));
};
exports.socketAuth = socketAuth;
//# sourceMappingURL=middleware.js.map