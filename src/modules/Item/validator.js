"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNFTItemValidator = void 0;
const tslib_1 = require("tslib");
const joi_1 = (0, tslib_1.__importDefault)(require("joi"));
const constants_1 = require("../../util/constants");
const responses_1 = require("../../util/responses");
const createNFTItemValidator = function (req, res, next) {
    const schema = joi_1.default.object().keys({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        image_url: joi_1.default.string().required(),
        created_by: joi_1.default.string().required(),
        owner: joi_1.default.string().required(),
        price: joi_1.default.string().required(),
        is_open_for_sale: joi_1.default.boolean().required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
        console.error(validation.error);
        (0, responses_1.sendResponse)(res, constants_1.RESPONSE_TYPES.VALIDATION_ERROR, {}, validation.error.details[0].message);
        return;
    }
    next();
};
exports.createNFTItemValidator = createNFTItemValidator;
//# sourceMappingURL=validator.js.map