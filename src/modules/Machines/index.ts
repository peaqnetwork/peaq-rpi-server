import { routesGenerator } from "../../util/commonFunctions";
import { HTTP_METHODS, routeInterface } from "../../util/types";
// import { authMiddleware } from "./Auth";
import { getMachineAddress } from "./controller";

const routes: routeInterface [] = [
    {
        path: '/getAddress',
        method: HTTP_METHODS.GET,
        handler: getMachineAddress,
        // middleware: [authMiddleware],

    },
];

export default routesGenerator(routes);