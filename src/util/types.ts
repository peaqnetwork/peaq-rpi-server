import { NextFunction, Request, Response } from "express";

export enum HTTP_METHODS {
    GET = "get",
    POST = "post",
    PUT = "put",
}

export interface routeInterface {
    path: string;
    method: HTTP_METHODS;
    handler: (req: Request, res: Response) => void;
    middleware?: Array<(req: Request, res: Response, next: NextFunction) => void>;
}

export interface dynamicObjectInterface {
    [key: string]: any;
}

export interface responseTypeInterface {
    message: string;
    status: number;
}

export interface createStorageKeysArgs{
    value: any,
    type: createStorageKeysEnum
}

export enum createStorageKeysEnum {
    ADDRESS,
    STANDARD
}

export enum storeNameEnum {
    PEAQ_DID_ATTRIBUTE_STORE = "attributeStore"
}

export interface peaqDidDocumentInterface {
    id: string;
    controller: string;
    verificationMethod: {
        id: string;
        type: string;
        controller: string;
        publicKeyMultibase: string;
    }[];
    signature: {
        type: string;
        issuer: string;
        hash: string;
    };
    service: {
        id: string;
        type: string;
        serviceEndpoint: string;
    }[];
    authentication: string[];
}