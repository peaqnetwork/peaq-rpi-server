"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
function sendResponse(res, response_type, data, custom_message, error) {
    const response = {
        message: custom_message || response_type.message,
        status: response_type.status,
        data: data || {},
        error: error || null,
    };
    console.info(JSON.stringify(response));
    error && console.error(error);
    res.status(response_type.status).json(response);
}
exports.sendResponse = sendResponse;
//# sourceMappingURL=responses.js.map