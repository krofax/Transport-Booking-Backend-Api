import express from 'express';

import seedUser from '../controllers/seedUserController';

const router = express.Router();

// seed user Route

router.get('/user/seed', seedUser);

export default router;
