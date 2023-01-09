import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { RESPONSE_TYPES } from '../../util/constants';
import { sendResponse } from '../../util/responses';

export const createNFTItemValidator = function (req: Request, res: Response, next: NextFunction) {

    const schema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image_url: Joi.string().required(),
        created_by: Joi.string().required(),
        owner: Joi.string().required(),
        price: Joi.string().required(),
        is_open_for_sale: Joi.boolean().required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
        console.error(validation.error);
        sendResponse(res, RESPONSE_TYPES.VALIDATION_ERROR, {}, validation.error.details[0].message);
        return;
    }
    next();
};
