import express from 'express';

import { createAdmin, updateUserToAdmin } from '../controllers/adminController';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

// users Routes

router.post('/admin/signup', verifyAuth, createAdmin);
router.put('/user/:id/admin', verifyAuth, updateUserToAdmin);

export default router;
