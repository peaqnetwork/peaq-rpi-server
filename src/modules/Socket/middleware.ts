import { signatureVerify } from '@polkadot/util-crypto';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const socketAuth = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError) => void,
) => {
    const { token } = socket.handshake.auth;
    if (token) {
        const [signature, message] = token.split('::');
        if (!signature || !message) return next(new Error('authentication error'));
        
        const controllerAddress = global.didDocument.controller.split(':')[2];
        const isValid = signatureVerify(message, signature, controllerAddress);
        if (!isValid) return next(new Error('authentication error'));
        
        return next();
    }
    return next(new Error('authentication error'));
};
