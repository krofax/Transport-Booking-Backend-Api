import express from 'express';

import { addBusDetails, getAllBuses } from '../controllers/busController';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

// buses Routes

router.post('/buses', verifyAuth, addBusDetails);
router.get('/buses', verifyAuth, getAllBuses);
export default router;
