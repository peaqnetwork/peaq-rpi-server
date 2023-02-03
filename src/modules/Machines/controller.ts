import { Request, Response } from "express";
import { RESPONSE_TYPES } from "../../util/constants";
import { sendResponse } from "../../util/responses";

export const getMachineAddress = async (_: Request, res: Response) => {
    try {
        
        sendResponse(res, RESPONSE_TYPES.SUCCESS, {address: global.machineKeyPair.address});

    } catch (error) {
        sendResponse(res, RESPONSE_TYPES.SERVER_ERROR, {}, "Server error", error);
    }
}