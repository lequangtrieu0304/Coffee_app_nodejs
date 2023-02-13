import express from 'express';
const router = express.Router();

import orderController from '../controllers/orderController';

router.post('/', orderController.createOrder);

export default router;