import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, _: Response, next: NextFunction) => {

    console.info('API', req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log('Params', JSON.stringify(req.params));
    console.log('Body', JSON.stringify(req.body));

    next();
}