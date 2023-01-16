"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonFunctions_1 = require("../../util/commonFunctions");
const types_1 = require("../../util/types");
const Auth_1 = require("./Auth");
const controller_1 = require("./controller");
const validator_1 = require("./validator");
const routes = [
    {
        path: '/create',
        method: types_1.HTTP_METHODS.POST,
        handler: controller_1.createItem,
        middleware: [Auth_1.authMiddleware, validator_1.createNFTItemValidator],
    },
];
exports.default = (0, commonFunctions_1.routesGenerator)(routes);
//# sourceMappingURL=index.js.map