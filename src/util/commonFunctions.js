"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDIDDocument = exports.createStorageKeys = exports.getMachineKeyPair = exports.routesGenerator = void 0;
const tslib_1 = require("tslib");
require("@polkadot/api-augment/polkadot");
const api_1 = require("@polkadot/api");
const keyring_1 = (0, tslib_1.__importDefault)(require("@polkadot/keyring"));
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const constants_1 = require("./constants");
const types_1 = require("./types");
const peaq_did_proto_js_1 = require("peaq-did-proto-js");
const routesGenerator = (routes) => {
    const router = express_1.default.Router();
    routes.forEach((route) => {
        const { path, method, handler, middleware: middleware } = route;
        const middlewareChain = middleware
            ? middleware.map((middleware) => middleware)
            : [];
        middlewareChain.push(handler);
        router[method](path, ...middlewareChain);
    });
    return router;
};
exports.routesGenerator = routesGenerator;
const generateKeyPair = (mnemonic) => {
    const keyring = new keyring_1.default({ type: 'sr25519' });
    const pair = keyring.addFromUri(mnemonic);
    return pair;
};
const getMachineKeyPair = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    yield (0, util_crypto_1.cryptoWaitReady)();
    console.log('Fetching machine key pair from seed.txt...');
    if (fs_1.default.existsSync('seed.txt')) {
        const seed = fs_1.default.readFileSync('seed.txt', 'utf8');
        if (seed)
            return generateKeyPair(seed);
    }
    console.log('No seed found, generating new key pair...');
    const mnemonic = (0, util_crypto_1.mnemonicGenerate)();
    const pair = generateKeyPair(mnemonic);
    fs_1.default.writeFileSync('seed.txt', mnemonic);
    console.log('New key pair generated and saved to seed.txt');
    return pair;
});
exports.getMachineKeyPair = getMachineKeyPair;
const makePalletQuery = (palletName, storeName, args) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    try {
        const api = yield getNetworkApi();
        const data = yield api.query[palletName][storeName](...args);
        api.disconnect();
        return data.toHuman();
    }
    catch (error) {
        console.error(`Error ${makePalletQuery.name} - `, error);
        return error;
    }
});
const createStorageKeys = (args) => {
    const keysByteArray = [];
    for (let i = 0; i < args.length; i++) {
        if (args[i].type === types_1.createStorageKeysEnum.ADDRESS) {
            const decoded_address = (0, util_crypto_1.decodeAddress)(args[i].value, false, 42);
            keysByteArray.push(decoded_address);
        }
        if (args[i].type === types_1.createStorageKeysEnum.STANDARD) {
            const hash_name = (0, util_1.u8aToU8a)(args[i].value);
            keysByteArray.push(hash_name);
        }
    }
    const key = (0, util_1.u8aConcat)(...keysByteArray);
    const hashed_key = (0, util_crypto_1.blake2AsHex)(key, 256);
    return { hashed_key };
};
exports.createStorageKeys = createStorageKeys;
const getDIDDocument = (keyPair) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { hashed_key } = (0, exports.createStorageKeys)([
        {
            value: keyPair.address,
            type: types_1.createStorageKeysEnum.ADDRESS,
        },
        { value: `peaq-console`, type: types_1.createStorageKeysEnum.STANDARD },
    ]);
    const did = yield makePalletQuery('peaqDid', types_1.storeNameEnum.PEAQ_DID_ATTRIBUTE_STORE, [hashed_key]);
    const doc = peaq_did_proto_js_1.Document.deserializeBinary((0, util_1.hexToU8a)(did.value));
    global.didDocument = doc.toObject();
});
exports.getDIDDocument = getDIDDocument;
const getNetworkApi = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    try {
        const api = new api_1.ApiPromise({
            provider: new api_1.WsProvider(constants_1.PEAQ_AGUNG_NETWORK),
        });
        yield api.isReadyOrError;
        return api;
    }
    catch (error) {
        console.error('getCrustNetworkApi error', error);
        throw error;
    }
});
exports.default = {
    routesGenerator: exports.routesGenerator,
};
//# sourceMappingURL=commonFunctions.js.map