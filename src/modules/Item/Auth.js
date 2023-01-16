"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const constants_1 = require("../../util/constants");
const responses_1 = require("../../util/responses");
const authMiddleware = (req, res, next) => {
    console.info('API', req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log('Params', JSON.stringify(req.params));
    console.log('Body', JSON.stringify(req.body));
    const unique_browser_id = req.headers['unique-browser-id'];
    if (!unique_browser_id) {
        (0, responses_1.sendResponse)(res, constants_1.RESPONSE_TYPES.UNAUTHORIZED, {});
        return;
    }
    next();
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=Auth.js.map