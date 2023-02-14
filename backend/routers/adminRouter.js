import express from 'express';
const router = express.Router();

import adminController from '../controllers/adminController';

router.get('/create-admin', adminController.createdAdminAccount);

router.post('/login', adminController.handleLogin);

export default router;