import express from 'express';

const router = express.Router();

import nft from '../modules/Item';


router.use('/nft', nft);

export default router;
