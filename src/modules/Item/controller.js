"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../../util/constants");
const responses_1 = require("../../util/responses");
const createItem = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    try {
        const itemData = req.body;
        (0, responses_1.sendResponse)(res, constants_1.RESPONSE_TYPES.SUCCESS, { itemData });
    }
    catch (error) {
        (0, responses_1.sendResponse)(res, constants_1.RESPONSE_TYPES.SERVER_ERROR, {}, "Server error", error);
    }
});
exports.createItem = createItem;
//# sourceMappingURL=controller.js.map