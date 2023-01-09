import { routesGenerator } from "../../util/commonFunctions";
import { HTTP_METHODS, routeInterface } from "../../util/types";
import { authMiddleware } from "./Auth";
import { createItem } from "./controller";
import { createNFTItemValidator } from "./validator";

const routes: routeInterface [] = [
    {
        path: '/create',
        method: HTTP_METHODS.POST,
        handler: createItem,
        middleware: [authMiddleware, createNFTItemValidator],

    },
];

export default routesGenerator(routes);