import "@polkadot/api-augment/polkadot";
import { ApiPromise, WsProvider } from '@polkadot/api';
import Keyring from '@polkadot/keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import { hexToU8a, u8aConcat, u8aToU8a } from '@polkadot/util';
import {
  blake2AsHex,
  cryptoWaitReady,
  decodeAddress,
  mnemonicGenerate,
} from '@polkadot/util-crypto';
import express from 'express';
import fs from 'fs';
import { PEAQ_AGUNG_NETWORK } from './constants';

import {
  createStorageKeysArgs,
  createStorageKeysEnum,
  routeInterface,
  storeNameEnum,
} from './types';
import { Document } from 'peaq-did-proto-js';

export const routesGenerator = (routes: routeInterface[]) => {
  const router = express.Router();
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

const generateKeyPair = (mnemonic: string) => {
  const keyring = new Keyring({ type: 'sr25519' });
  const pair = keyring.addFromUri(mnemonic);
  return pair;
};

export const getMachineKeyPair = async () => {
  await cryptoWaitReady();
  console.log('Fetching machine key pair from seed.txt...');
  if (fs.existsSync('seed.txt')) {
    const seed = fs.readFileSync('seed.txt', 'utf8');
    if (seed) return generateKeyPair(seed);
  }

  console.log('No seed found, generating new key pair...');
  const mnemonic = mnemonicGenerate();

  const pair = generateKeyPair(mnemonic);
  fs.writeFileSync('seed.txt', mnemonic);
  console.log('New key pair generated and saved to seed.txt');
  return pair;
};

const makePalletQuery = async (
  palletName: string,
  storeName: string,
  args: any[],
) => {
  try {
    const api = await getNetworkApi();
    const data = await api.query[palletName][storeName](...args);
    api.disconnect();
    return data.toHuman();
  } catch (error) {
    console.error(`Error ${makePalletQuery.name} - `, error);
    return error;
  }
};

export const createStorageKeys = (args: createStorageKeysArgs[]) => {
  // decode address to byte array
  const keysByteArray = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i].type === createStorageKeysEnum.ADDRESS) {
      const decoded_address = decodeAddress(args[i].value, false, 42);
      keysByteArray.push(decoded_address);
    }
    if (args[i].type === createStorageKeysEnum.STANDARD) {
      const hash_name = u8aToU8a(args[i].value);
      keysByteArray.push(hash_name);
    }
  }
  const key = u8aConcat(...keysByteArray);
  // encode the key using blake2b
  const hashed_key = blake2AsHex(key, 256);
  return { hashed_key };
};

export const getDIDDocument = async (keyPair: KeyringPair) => {
  const { hashed_key } = createStorageKeys([
    {
      value: keyPair.address,
      type: createStorageKeysEnum.ADDRESS,
    },
    { value: `peaq-console`, type: createStorageKeysEnum.STANDARD },
  ]);

  const did = await makePalletQuery(
    'peaqDid',
    storeNameEnum.PEAQ_DID_ATTRIBUTE_STORE,
    [hashed_key],
  );
  const doc = Document.deserializeBinary(hexToU8a(did.value));

  global.didDocument = doc.toObject() as any;
};

const getNetworkApi = async () => {
  try {
    const api = new ApiPromise({
      provider: new WsProvider(PEAQ_AGUNG_NETWORK),
    });
    await api.isReadyOrError;
    return api;
  } catch (error) {
    console.error('getCrustNetworkApi error', error);
    throw error;
  }
};

export default {
  routesGenerator,
};
