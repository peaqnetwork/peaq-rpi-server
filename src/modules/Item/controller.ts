import { Request, Response } from "express";
import { RESPONSE_TYPES } from "../../util/constants";
import { sendResponse } from "../../util/responses";

export const createItem = async (req: Request, res: Response) => {
    try {
        const itemData = req.body;

        sendResponse(res, RESPONSE_TYPES.SUCCESS, {itemData});

    } catch (error) {
        sendResponse(res, RESPONSE_TYPES.SERVER_ERROR, {}, "Server error", error);
    }
}