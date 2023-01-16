"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeNameEnum = exports.createStorageKeysEnum = exports.HTTP_METHODS = void 0;
var HTTP_METHODS;
(function (HTTP_METHODS) {
    HTTP_METHODS["GET"] = "get";
    HTTP_METHODS["POST"] = "post";
    HTTP_METHODS["PUT"] = "put";
})(HTTP_METHODS = exports.HTTP_METHODS || (exports.HTTP_METHODS = {}));
var createStorageKeysEnum;
(function (createStorageKeysEnum) {
    createStorageKeysEnum[createStorageKeysEnum["ADDRESS"] = 0] = "ADDRESS";
    createStorageKeysEnum[createStorageKeysEnum["STANDARD"] = 1] = "STANDARD";
})(createStorageKeysEnum = exports.createStorageKeysEnum || (exports.createStorageKeysEnum = {}));
var storeNameEnum;
(function (storeNameEnum) {
    storeNameEnum["PEAQ_DID_ATTRIBUTE_STORE"] = "attributeStore";
})(storeNameEnum = exports.storeNameEnum || (exports.storeNameEnum = {}));
//# sourceMappingURL=types.js.map