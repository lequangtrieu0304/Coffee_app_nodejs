import express from 'express';
const router = express.Router();

import userController from '../controllers/userController';
import { authentication } from '../middleware/tokenAccess';

router.get('/create-admin', userController.createdAdminAccount);

router.post('/login', userController.handleLogin);

router.post('/register', userController.handleRegister);

router.put('/update/:id', authentication, userController.handleUpdate);

export default router;