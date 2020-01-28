import express from 'express';

import { createTrip, getAllTrips, cancelTrip, filterTripByOrigin, filterTripByDestination } from '../controllers/tripController';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

// trips Routes

router.post('/trips', verifyAuth, createTrip);
router.get('/trips', verifyAuth, getAllTrips);
router.patch('/trips/:tripId', verifyAuth, cancelTrip);
router.get('/trips/origin', verifyAuth, filterTripByOrigin);
router.get('/trips/destination', verifyAuth, filterTripByDestination);

export default router;
