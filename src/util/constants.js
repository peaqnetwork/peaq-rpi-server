"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PEAQ_AGUNG_NETWORK = exports.RESPONSE_TYPES = void 0;
exports.RESPONSE_TYPES = {
    SUCCESS: {
        message: 'success',
        status: 200,
    },
    SERVER_ERROR: {
        message: 'server error',
        status: 500,
    },
    CLIENT_ERROR: {
        message: 'client error',
        status: 400,
    },
    NOT_FOUND: {
        message: 'not found',
        status: 404,
    },
    VALIDATION_ERROR: {
        message: 'validation error',
        status: 422,
    },
    UNAUTHORIZED: {
        message: 'unauthorized',
        status: 401,
    }
};
exports.PEAQ_AGUNG_NETWORK = "wss://wss-dev.agung.peaq.network";
//# sourceMappingURL=constants.js.map