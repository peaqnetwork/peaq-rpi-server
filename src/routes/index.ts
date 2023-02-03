import express from 'express';

const router = express.Router();

import machines from '../modules/Machines';


router.use('/machines', machines);

export default router;
